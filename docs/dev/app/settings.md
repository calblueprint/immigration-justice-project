# Settings Page

The settings/profile page is divided up by sections to make the information more digestible.

Currently, we have the following sections:

-   Account
-   Basic Information
-   Availability
-   Roles (and role-specific information)

::: note Account Section
The account section displays the user's email and a hardcoded obfuscated string to represent the password.

Currently, we have not implemented the ability to edit the email or change password (through settings). This could be an area of future development if so desired!
:::

## Editing Sections

::: details File Location

```:no-line-numbers
└─ src
   └─ components
      └─ SettingsSection
         ├─ AvailabilitySection.tsx
         ├─ BasicInformationSection.tsx
         ├─ RolesSection.tsx
         └─ index.tsx
```

:::

In code, each section is a separate component, built using the generic `SettingSection` component.

An example usage can be found in `SettingsSection/AvailabilitySection.tsx`.

![availability section](/assets/image/availability-section.png)

The `SettingSection` component has the following props:

-   `title` (`string`) - specifies the title of the section.
-   `isEditing` (`boolean`) - used to determine whether to display values or allow edit via form controls.
-   `startEdit` (`() => void`) - callback function triggered when the user clicks the edit button.
-   `cancelEdit` (`() => void`) - callback function triggered when the user wants to cancel editing.
-   `isSubmitting` (`boolean`) - indicator of whether the user is currently submitting.
-   `canEdit` (`boolean`) - indicator of whether or not to show an edit button.
    -   Default: `true`

### Editing Fields

Each section also contains one or more fields (i.e. time commitment), which can be declared using the generic `SettingField` component.

The `SettingField` component has the following props:

-   `label` (`string`) - specifies the label for the field
-   `render` (`({ field, fieldState }: FieldProps) => ReactNode`) - render function for the form input
-   `extractValue` (`(v: FieldValue) => string`) - callback function to format the underlying value into a user-facing string (i.e. format a Date object into a human-readable string)
    -   Default: `v => (typeof v === 'string' ? v : String(v))`
-   `naValue` (`string`) - specifies what to display when the value is undefined or null
    -   Default: `'N/A'`
-   `required` (`boolean`) - indicator of whether to mark the field as required
    -   Default: `true`

Here is an example of a `SettingField` usage:

```tsx:no-line-numbers
<SettingField
  control={form.control}
  name="hoursPerMonth"
  label="Time Commitment (hrs/month)"
  render={({ field, fieldState }) => (
    <TextInput ... />
  )}
/>
```

Additionally, for the Account section, we have also defined a `ReadOnlySettingField`. This, as the name implies, only serves to display information and cannot be edited.

The `ReadOnlySettingField` component has the following props:

-   `label` (`string`) - specifies the label for the field
-   `value` (`string`) - specifies the value for the field

### Editing Forms

Each section uses the Zod and react-hook-form paradigm, similar to [onboarding forms](/dev/app/onboarding). The primary difference is the components we use - `SettingSection` and `SettingField` abstracts away much of the repetitiveness of defining form components, so we only have to pass in the form control to the render function of `SettingField`.

Similar to onboarding forms, we must define a form schema for each section, then use that to create the `form` object. Next, we wrap all form elements in three containers: `FormProvider`, HTML form, and `SettingSection`.

Here's an example:

```tsx:no-line-numbers
import { FormProvider, useForm } from 'react-hook-form';
import { SettingSection, SettingField } from '@/components/SettingsSection';

export default function Page() {
  const form = useForm<...>(...);

  const onValidSubmit = (values: z.infer<...>) => { ... }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)}>
        <SettingSection>
          <SettingField ... />
          <SettingField ... />
        </SettingSection>
      </form>
    </FormProvider>
  )
}
```
