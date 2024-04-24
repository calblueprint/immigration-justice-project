import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Flex } from '@/styles/containers';
import { Spinner } from '@/styles/spinner';
import { H2, P } from '@/styles/text';
import { BlueButton, Button } from '../Buttons';
import { EditButton } from '../EditButton';
import { FormField, FormItem, FormLabel } from '../Form';
import { Label } from '../Form/styles';
import * as Styles from './styles';

// context to control edit mode
interface SettingSectionContextProps {
  editing?: boolean;
}

const SettingSectionContext = createContext<SettingSectionContextProps>({
  editing: false,
});

// root section (card/container)
interface RootProps {
  title: string;
  children: React.ReactNode;
  isEditing?: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  isSubmitting?: boolean;
}

export function SettingSection({
  isEditing,
  setIsEditing,
  title,
  isSubmitting,
  children,
}: RootProps) {
  const editing = useMemo(() => ({ editing: isEditing }), [isEditing]);

  return (
    <SettingSectionContext.Provider value={editing}>
      <Styles.SectionContainer>
        <Flex $justify="between">
          <H2>{title}</H2>
          {!isEditing ? (
            <EditButton onClick={() => setIsEditing?.(true)} />
          ) : null}
        </Flex>

        {children}

        {isEditing ? (
          <Flex $gap="1.25rem" $justify="end">
            <Button type="button" onClick={() => setIsEditing?.(false)}>
              Discard Changes
            </Button>
            <BlueButton type="submit" disabled={isSubmitting}>
              <Flex $gap="10px" $justify="center">
                {isSubmitting ? <Spinner /> : null}
                Save Changes
              </Flex>
            </BlueButton>
          </Flex>
        ) : null}
      </Styles.SectionContainer>
    </SettingSectionContext.Provider>
  );
}

// one field (label + value) in the section

interface FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
  label: string;
  extractValue?: (v: TFieldValues[TName]) => string;
  naValue?: string;
  required?: boolean;
}

export function SettingField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  naValue = 'N/A',
  render,
  extractValue = v => (typeof v === 'string' ? v : String(v)),
  required = true,
  ...props
}: FieldProps<TFieldValues, TName>) {
  const { editing } = useContext(SettingSectionContext);

  return (
    <FormField
      {...props}
      render={({ field, ...renderProps }) => (
        <FormItem>
          <FormLabel $required={editing && required}>{label}</FormLabel>
          {editing ? (
            render({ field, ...renderProps })
          ) : (
            <P>{extractValue(field.value) || naValue}</P>
          )}
        </FormItem>
      )}
    />
  );
}

// read only field - used for account section
interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

export function ReadOnlySettingField({ label, value }: ReadOnlyFieldProps) {
  return (
    <Styles.Field>
      <Label>{label}</Label>
      <P>{value}</P>
    </Styles.Field>
  );
}
