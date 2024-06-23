# Onboarding

## The Onboarding Process

After the user first created their account, they will be prompted to complete an onboarding process to fill in information about their profile.

The onboarding process begins with a roles form, which asks the user about the role they wish to hold in the user portal.

![role form](/assets/image/role-form.png)

The user can pick and mix from among 3 options: interpreter, attorney, and/or legal fellow. However, they cannot be both an attorney and legal fellow at the same time. Role options can be found in `src/data/roles.ts`.

### Onboarding Flow

Depending on the role chosen by the user, they will be given a slightly different flow of onboarding - that is, most of the essential questions stay the same, but some roles (like attorney) may have to answer additional questions.

Each flow can be specified by a list of page links. Examples of the current presets can be found in `src/data/onboardingFlows.ts`.

### Onboarding Form

Many of the page links specified by onboarding flows lead to a form.

![availability form](/assets/image/availability-form.png)

These forms are made using a combination of [Zod](https://www.npmjs.com/package/zod) for client-side form validation and [react-hook-form](https://www.npmjs.com/package/react-hook-form) to efficiently handle form events and integrate Zod for validation. Examples of the combo in action can be found in `src/app/onboarding/basic-information/page.tsx`. Later on this page, we'll have [a more detailed walkthrough](#zod-and-react-hook-form) of this form.

### Onboarding Manager

The onboarding manager is placed in the layout of the entire onboarding flow, handling state changes and redirects shared across onboarding. Its implementation can be found in `src/components/OnboardingManager.tsx`.

It serves two primary purposes:

1. Listen for invalid URLs and redirect accordingly; and
2. Pass the current progress onto the progress bar.

### The Progress Bar

Users can use the progress bar to quickly navigate to a previously completed step to change what they had inputted previously.

Edge cases covered:

-   The user cannot use the progress bar to skip steps that they have not completed
-   If the user went back to an earlier step and modified their data to an invalid state, they cannot abuse the progress bar to skip to later steps

## Tools for Onboarding

### Onboarding Context

Since we want the user to modify their data between pages in the onboarding process, we would need a context to encapsulate the entire process, including the roles form. We placed the provider for this context in `app/onboarding/layout.tsx`, shared across all onboarding pages.

The context provided various states and related setter functions, including:

-   `profile`: The partially completed profile
-   `canSpeaks`: Languages the user can speak and understand
-   `canReads`: Languages the user can read and write
-   `roles`: Roles chosen by the user
-   `progress`: The current onboarding progress
-   `flow`: The current flow
-   `form`: The current form state (valid, dirty, etc)
-   `pushingData`: Whether or not the user is currently submitting the entire onboarding data

In addition, it also provides a function, `flushData`, to submit the collected profile data to the database, which is called at the end after the user reviewed their profile and pressed submit.

### Hooks

To simplify the process, we have also developed custom hooks to abstract redundant hook logic. We'll go over each of their functions and purposes.

**`useScrollTop`**

This hook is meant to be used in a page component. When added, it will cause the app to scroll to the top of the page when the page is first rendered. This is used on onboarding pages to shift the camera up after they click continue, which allows the user to start inputting immediately on the next form.

**`useGuardedOnboarding`**

This hook acts like a regular `useContext`, but in addition, it abstracts away error handling in the case that the onboarding context is not defined. It also automatically redirects the user to the roles form if the flow is empty, which can occur and crash the application if the user manually navigates to an onboarding form other than the roles form.

**`useOnboardingNavigation`**

This hook uses `useGuardedOnboarding` to provide the following useful helper variables and functions:

-   `pageProgress`: the progress of the current page the user is on (contrast with the furthest progress the user has gotten)
-   `flowAt(at: number)`: checks the page at the specified index of the flow and returns its URL
-   `ebbTo(href: string)`: safely redirects to another URL only if the current form is valid, triggers the form validation otherwise to reveal existing errors
-   `backlinkHref`: the URL of the previous step in the onboarding flow

## Zod and react-hook-form

::: info Credit where credit's due.
This workflow is largely taken from [shadcn UI's form components](https://ui.shadcn.com/docs/components/form). We've simply styled it differently.
:::

To begin using `react-hook-form` with `Zod`, we must first define a form schema using `Zod`.

### Form Schemas

Each form has one form schema, which defines what fields the form should expect to receive upon submission, and what makes each field valid. With proper form schema definitions, this can make designing forms and validating data a breeze. Existing form schemas can be found in `src/data/formSchemas.ts`.

Here's one example:

```ts:no-line-numbers
import { z } from 'zod';

export const basicInformationSchema = z.object({
    firstName: z
        .string({ required_error: 'Please include your first name' })
        .min(1, { message: 'Please include your first name' }),
    // truncated
});
```

### The `useForm` Hook

To begin making a form, we can call the `useForm` hook provided by `react-hook-form`, which gives us a very helpful form object.

```tsx:no-line-numbers
import { basicInformationSchema } from '@/data/formSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Page() {
    const onboarding = useGuardedOnboarding();

    // truncated

    const form = useForm<z.infer<typeof basicInformationSchema>>({
        resolver: zodResolver(basicInformationSchema),
        defaultValues: {
            firstName: onboarding.profile.first_name,
            // truncated
        }
    });

    // truncated
}
```

A lot is going here, so let's break it down.

`useForm` itself is a generic function that takes in a Typescript type specifying the data the form should expect to receive. Recall that we have already specified this in the form schema! We just have to tell Zod to parse it into a Typescript type using the rather cryptic `z.infer<typeof basicInformationSchema>` generic function, then pass that along to `useForm`.

Next, we tell `useForm` to use the `zodResolver`, given to us by a handy library called `@hookform/resolvers`, along with the form schema that we've defined. This is all the error handling we need to tell `useForm` to do! Zod resolver will use what we've defined in the form schema and handle it accordingly.

Finally, we just have to declare the default values. Since this page is an onboarding form, it will re-render as the user navigates between forms. We'd like the previously entered values to stay, so we have to get what we've stored in the onboarding context and set that as the default value. By default, if the user has yet to enter anything, it should be empty.

### Building Forms

Now that we have the form object, we can build the markup for the form.
Let's start with the scaffolding:

```tsx:no-line-numbers
// truncated
import { FormProvider, useForm } from 'react-hook-form';

export default function Page() {
  // truncated

  return (
    <FormProvider {...form}>
      <form>
        {/* page and form items */}
      </form>
    </FormProvider>
  )
}
```

To use `react-hook-form`, we must also use the given `FormProvider`, which stores the form states under the hood. Inside the `FormProvider`, we can place the HTML form element (in the project, we use a styled-component wrapper of an HTML form element). And inside of that, we can put our form components.

```tsx:no-line-numbers
import { FormField, FormItem } from '@/components/Form';

// truncated
<form>
  <FormField
    control={form.control}
    name='firstName'
    render={({ field, fieldState }) => (
      <FormItem>
        {/* truncated */}
      </FormItem>
    )}
  />
  {/* truncated */}
</form>
// truncated
```

For each field, we wrap it in a `FormField` component. Under the hood, it will link the `FormItem` component inside up with the field corresponding to the given name.

```tsx:no-line-numbers
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';

// truncated
<FormItem>
  <FormLabel>First Name</FormLabel>
  <FormControl>
    <TextInput
      errorText={fieldState.error?.message}
      defaultValue={field.value}
      onChange={(v) => {
        onboarding.updateProfile({
          first_name: v,
        });
        field.onChange(v);
      }}
    />
  </FormControl>
</FormItem>
// truncated
```

Each item has a label and control. The label is wrapped in `FormLabel`, and similarly, the control component is wrapped in `FormControl`. The two should be automatically linked together using `htmlFor` by `FormItem`.

As for the form control, we're using a text input here since this is the form field for first name.
We can pass in the field's error (which we specify in the form schema) into the error of the the input, specify the default value, and tell it to update both the field and the onboarding state on change. With that, we're done with the first name input and got complete form validation to boot!

### Submitting Forms

Now, we can define the handler when the user submits a valid form data.

```tsx:no-line-numbers
export default function Page() {
  // truncated

  // only executes if the form is valid
  // note: we can also choose to not take in any parameters
  const onValidSubmit = (values: z.infer<typeof basicInformationSchema>) => {
    // implementation not shown
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)}>
        {/* truncated */}
      </form>
    </FormProvider>
  )
}
```

To take full advantage of `react-hook-form`, we can use the `form.handleSubmit(submitFunction)` function, which wraps around our specified submit function and only runs it if the form is valid.
