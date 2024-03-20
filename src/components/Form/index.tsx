// huge inspiration from shadcn form UI
// https://ui.shadcn.com/docs/components/form

import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
} from 'react';

import { createContext, forwardRef, useContext, useId, useMemo } from 'react';
import {
  Controller,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';

import * as Styles from './styles';

// types
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

type FormItemContextValue = {
  id: string;
};

// contexts
const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  if (!fieldContext)
    throw new Error('useFormField should be used within <FormField>');

  const { id } = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// form components (context providers)
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const contextValue = useMemo(
    () => ({
      name: props.name,
    }),
    [props],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const id = useId();

  const contextValue = useMemo(
    () => ({
      id,
    }),
    [id],
  );

  return (
    <FormItemContext.Provider value={contextValue}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

// form components (ui)

export const FormLabel = forwardRef<
  HTMLLabelElement,
  HTMLAttributes<HTMLLabelElement>
>(({ ...props }, ref) => {
  const { formItemId } = useFormField();

  return <Styles.Label as="label" ref={ref} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = 'FormLabel';

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return <Styles.Description ref={ref} id={formDescriptionId} {...props} />;
});
FormDescription.displayName = 'FormDescription';

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Styles.Message ref={ref} id={formMessageId} $hasError={!!error} {...props}>
      {body}
    </Styles.Message>
  );
});
FormMessage.displayName = 'FormMessage';
