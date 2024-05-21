import z from 'zod';
import { getCurrentDate } from '@/utils/helpers';

const zodDropdownOption = {
  label: z.string(),
  value: z.string(),
};

export const roleEnumeration = [
  'ATTORNEY',
  'INTERPRETER',
  'LEGAL_FELLOW',
  'ATTORNEY,INTERPRETER',
  'LEGAL_FELLOW,INTERPRETER',
  '',
] as const;

export type FormRoleEnum = (typeof roleEnumeration)[number];

export const roleSchema = z.object({
  roles: z.enum(roleEnumeration).superRefine((input, ctx) => {
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
    .nonnegative({ message: 'This value must be nonnegative' }),
  startDate: z
    .date({
      required_error:
        'Please include your estimated starting date of availability',
    })
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  availability: z
    .string()
    .max(400, 'Please keep it within 400 characters')
    .optional()
    .nullable(),
});

export const attorneyCredentialSchema = z
  .object({
    stateBarred: z
      .string({
        required_error: 'Please include a state',
        invalid_type_error: 'Please include a state',
      })
      .min(1, { message: 'Please include a state' }),
    barred: z.boolean(),
    barNumber: z
      .string({ required_error: 'Please include your attorney bar number' })
      .min(1, { message: 'Please include your attorney bar number' }),
    eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
    legalCredentialComment: z
      .string()
      .max(400, 'Please keep it within 400 characters')
      .optional()
      .nullable(),
  })
  .superRefine((input, ctx) => {
    if (!input.barred && !input.legalCredentialComment)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide some additional information',
        path: ['legalCredentialComment'],
      });
    return ctx;
  });

export const legalFellowCredentialSchema = z.object({
  expectedBarDate: z
    .date({ required_error: 'Must include expected barred date' })
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});

// for settings
export const roleAndLegalSchema = z
  .object({
    roles: z.enum(roleEnumeration).superRefine((input, ctx) => {
      if (input === '')
        ctx.addIssue({
          code: 'custom',
          message: 'Must include at least one role',
        });
      return ctx;
    }),
    stateBarred: z
      .string({
        invalid_type_error: 'Please include a state',
      })
      .min(1, { message: 'Please include a state' })
      .optional()
      .nullable(),
    barNumber: z
      .string()
      .min(1, { message: 'Please include your attorney bar number' })
      .optional()
      .nullable(),
    eoirRegistered: z.boolean().optional().nullable(),
    expectedBarDate: z
      .date()
      .min(getCurrentDate(), {
        message: 'Must select a current or future date',
      })
      .optional()
      .nullable(),
  })
  .superRefine((input, ctx) => {
    // attorney or legal fellow must fill out EOIR registered
    if (
      input.roles !== 'INTERPRETER' &&
      typeof input.eoirRegistered !== 'boolean'
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must select one option',
        path: ['eoirRegistered'],
      });

    // attorney specific fields required
    if (input.roles === 'ATTORNEY' || input.roles === 'ATTORNEY,INTERPRETER') {
      if (!input.barNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please include your attorney bar number',
          path: ['barNumber'],
        });
      if (!input.stateBarred)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please include a state',
          path: ['stateBarred'],
        });
    }

    // legal fellow fields required
    if (
      (input.roles === 'LEGAL_FELLOW' ||
        input.roles === 'LEGAL_FELLOW,INTERPRETER') &&
      !input.expectedBarDate
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must include expected barred date',
        path: ['expectedBarDate'],
      });
  });
