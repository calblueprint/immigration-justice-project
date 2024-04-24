import z from 'zod';
import { getCurrentDate } from '@/utils/helpers';

const zodDropdownOption = {
  label: z.string(),
  value: z.string(),
};

export const roleSchema = z.object({
  roles: z
    .enum([
      'ATTORNEY',
      'INTERPRETER',
      'LEGAL_FELLOW',
      'ATTORNEY,INTERPRETER',
      'LEGAL_FELLOW,INTERPRETER',
      '',
    ])
    .superRefine((input, ctx) => {
      if (input === '')
        ctx.addIssue({
          code: 'custom',
          message: 'Must include at least one role',
        });
      return ctx;
    }),
});

export const basicInformationSchema = z.object({
  firstName: z
    .string({ required_error: 'Please include your first name' })
    .min(1, { message: 'Please include your first name' }),
  lastName: z
    .string({ required_error: 'Please include your last name' })
    .min(1, { message: 'Please include your first name' }),
  country: z
    .string({
      required_error: 'Please include the country of your primary residence',
    })
    .min(1, {
      message: 'Please include the country of your primary residence',
    }),
  state: z
    .string({
      required_error: 'Please include the state of your primary residence',
    })
    .min(1, { message: 'Please include the state of your primary residence' }),
  city: z
    .string({
      required_error: 'Please include the city of your primary residence',
    })
    .min(1, { message: 'Please include the city of your primary residence' }),
  phoneNumber: z
    .string({ required_error: 'Please include a phone number' })
    .regex(
      /(^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$)|(^$)/,
      { message: 'Invalid phone number' },
    )
    .min(1, { message: 'Please include a phone number' }),
  canSpeaks: z
    .array(z.object(zodDropdownOption))
    .min(1, 'Please select at least one language you can speak or understand'),
  canReads: z
    .array(z.object(zodDropdownOption))
    .min(1, 'Please select at least one language you can speak or understand'),
});

export const availabilitySchema = z.object({
  hoursPerMonth: z
    .number({
      required_error:
        'Please include your estimated availability in hours per month',
    })
    .nonnegative({ message: 'This value must be nonnegative' })
    .max(744, { message: 'Please enter a valid hours per month' }),
  startDate: z
    .date({
      required_error:
        'Please include your estimated starting date of availability',
    })
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  availability: z.string().optional().nullable(),
});

export const legalCredentialSchema = z.object({
  stateBarred: z
    .string({
      required_error: 'Please include a state',
      invalid_type_error: 'Please include a state',
    })
    .min(1, { message: 'Please include a state' }),
  barNumber: z
    .string({ required_error: 'Please include your attorney bar number' })
    .min(1, { message: 'Please include your attorney bar number' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});

export const legalFellowCredentialSchema = z.object({
  expectedBarDate: z
    .date({ required_error: 'Must include expected barred date' })
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});
