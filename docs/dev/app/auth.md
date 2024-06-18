---
prev: /dev/app/
---

# Authentication

## User Auth Flows 

**Log In**

`src/app/(auth)/login`
- After a successful login, the user is redirected as follows: 
    - Incomplete onboarding -> onboarding
    - Complete onboarding -> listing page corresponding to the user's role 

::: info Rerouting based on Profile Roles
The following applies to any rerouting based on the user's profile roles. If the user is an Attorney/Legal Fellow *and* an Interpreter, the user will be rerouted to the listing page corresponding to their non-interpreter role. This means: if the user's role includes Attorney, they're routed to the `cases` listings page; if their role includes Legal Fellow, they're routed to `limited-case-assignments` listings. The user is only rerouted to `interpretation` listings if their only role is Interpreter. See [Onboarding](./onboarding) for more info about Profile Roles.
:::

**Sign Up**

`src/app/(auth)/signup`
- User is sent an email 

**Forgot Password**

forgot-password -> send reset-password link to email 
user clicks link in email -> reset-password 

::: info Access to `reset-password` page
The `reset-password` page is only accessible via the reset-password link sent to the user's email, trigged from the Forgot Password page. If a user routes to `\reset-password` manually, the page will appear blank. 
:::

## Supabase

`supabase.auth.getSession`: see Supabase's documentation. 

`supabase.auth.signInWithPassword`

`supabase.auth.onAuthStateChange`

`supabase.auth.signInWithPassword`

`supabase.auth.signOut`

`supabase.auth.signUp`

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

## Sign Up Flow

New users creating an account for the first time will go through the sign-up flow, handled in `src/app/(auth)/signup`. 
1. Users are prompted to create a new account with an email and password. 

Edge Cases 
- Attempting to create a new account with an existing user's email: we do not specifically prevent users from creating a new 
### Password Complexity 

**Editing Password Complexity Conditions**

Password complexity conditions can be modified in the PasswordComplexity component. Each requirement is an instance of `PasswordRequirement`. See the codebase (`src/components/PasswordComplexity`) for examples of how `PasswordRequirement` components can be instantiated and used. The current complexity conditions include: 
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number (0-9)
- At least 8 characters