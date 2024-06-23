---
prev: /dev/app/
---

# Authentication

## User Auth Flows 

### **Log In**

Users with existing accounts can log in with their email accounts and passwords. From `/login`, users can also navigate to `/signup` or `/forgot-password` instead. For implementation, see `src/app/(auth)/login`.

- If the user is already logged in, the user will be automatically redirected from `/login` to another page based on the auth and profile contexts. 
- After a successful login, the user is redirected based on the profile context, as follows: 
    - Incomplete onboarding -> onboarding
    - Complete onboarding -> listing page corresponding to the user's role 

::: info Rerouting based on Profile Roles
The following applies to any rerouting based on the user's profile roles. If the user is an Attorney/Legal Fellow *and* an Interpreter, the user will be rerouted to the listing page corresponding to their non-interpreter role. This means: if the user's role includes Attorney, they're routed to the `cases` listings page; if their role includes Legal Fellow, they're routed to `limited-case-assignments` listings. The user is only rerouted to `interpretation` listings if their only role is Interpreter. See [Onboarding](./onboarding) for more info about Profile Roles.
:::

### **Sign Up**

New users creating an account for the first time will go through the sign-up flow, handled in `src/app/(auth)/signup`. Users can also navigate from `/signup` to the login flow if they already have an account. 

1. Users are prompted to create a new account with an email and password. 
2. If the new account credentials are valid, the user is directed to the `/verification-email-sent` page, indicating that an account-verification email has been sent to them. The user can also choose to resend the email on this page, if they think there has been an error. 
3. After the user clicks on the verification-link sent via email, the user is directed to `/email-verified`. From this page, users are directed to navigate back to Onboarding.  

Edge Cases 
- Currently, users cannot sign up with an email that is already registered, and they're given a general ("Something went wrong. Please try again.") error message when attempting to do so.
- Accounts that have not been verified are/are not allowed to login regularly and continue to onboarding. 

### **Forgot Password**

Implemented in `src/app/(auth)/forgot-password`, the forgot password flow is as follows: 

1. On `/forgot-password`, the user inputs the email associated with their account. After clicking "Send Email", they can choose to click "Resend Email."
2. An email is sent to that email address.
3. After clicking on the link sent via email, the user is directed to `/reset-password`, where they set a new password and confirm the password. 
4. If a valid new password is inputted, the user is directed to `/confirm-reset-password`, which instructs the user to navigate to `/login`.
    * A new password is considered valid if it meets the same password complexity requirements and is different from previous passwords. The latter condition is checked using Supabase's `verifyNewPassword` function.

::: info Access to `reset-password` page
The `reset-password` page is only accessible via the reset-password link sent to the user's email, trigged from the Forgot Password page. If a user routes to `\reset-password` manually, the page will appear blank. 
:::

### Password Complexity 

**Editing Password Complexity Conditions**

Used for both the signup and the forgot-password flow, password complexity conditions can be modified in the PasswordComplexity component. Each requirement is an instance of `PasswordRequirement`. See the codebase (`src/components/PasswordComplexity`) for examples of how `PasswordRequirement` components can be instantiated and used. The current complexity conditions include: 
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number (0-9)
- At least 8 characters

## Supabase

Supabase's documentation for all auth functions can be found [here](https://supabase.com/docs/reference/javascript/auth-api). Below, the links take you to the specific section of the documentation for each function. 

`supabase.auth.getSession`: see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-getsession). 

`supabase.auth.signInWithPassword`:  see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-signinwithpassword
). 

`supabase.auth.onAuthStateChange`: see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-onauthstatechange). 

`supabase.auth.signInWithPassword`: see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-signinwithpassword). 

`supabase.auth.signOut`: see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-signout). 

`supabase.auth.signUp`: see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-signup). 

`supabase.auth.resend`: see [Supabase's documentation](https://supabase.com/docs/reference/javascript/auth-resend). 

## Contexts

The auth context is provided in `@/utils/AuthProvider`. The context includes the following fields and functions: 

- `session` (optional): **`Session`**

    Obtained from `supabase.auth.getSession`, the `session` is only defined when the user is logged in. 

- `userId` (optional): **`UUID`**

    Obtained from `supabase.auth.getSession`, the `userId` is only defined when the user is logged in; otherwise, it is undefined. Thus, this field is often used to check if the user is logged in. 

- `userEmail`: **`string`**

    Obtained from `supabase.auth.getSession`, the `userEmail` is only defined when the user is logged in; otherwise, it is undefined.

- `signIn`: **`(email: string, password: string) => Promise<AuthResponse>`**

    Calls `supabase.auth.signInWithPassword`.

- `signOut`: **`() => Promise<AuthError | null>`**

    Calls `supabase.auth.signOut`.

- `signUp`: **`(email: string, password: string, options: object) => Promise<AuthResponse>`**

    Calls `supabase.auth.signUp`.

To create a new auth instance: 
```tsx:no-line-numbers
import { useAuth } from '@/utils/AuthProvider';

const auth = useAuth();
```
