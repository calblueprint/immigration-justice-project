'use client';

import BigButton from '@/components/BigButton';
import InputDropdown from '@/components/InputDropdown';
import { H1 } from '@/styles/text';
import { RoleEnum } from '@/types/schema';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import { useRouter } from 'next/navigation';
import { FormDiv } from '../styles';

type RoleOptionType =
  | ''
  | 'ATTORNEY'
  | 'INTERPRETER'
  | 'LEGAL_FELLOW'
  | 'ATTORNEY,INTERPRETER'
  | 'LEGAL_FELLOW,INTERPRETER';

const roleOptions = new Map<string, string>([
  ['ATTORNEY', 'Attorney'],
  ['INTERPRETER', 'Interpreter'],
  ['LEGAL_FELLOW', 'Legal Fellow'],
  ['ATTORNEY,INTERPRETER', 'Attorney and Interpreter'],
  ['LEGAL_FELLOW,INTERPRETER', 'Legal Fellow and Interpreter'],
]);

const roleSchema = z.object({
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

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const { push } = useRouter();

  const onSubmit = (values: z.infer<typeof roleSchema>) => {
    if (!onboarding) throw new Error('Fatal: no onboarding layout detected');

    const roles = new Set(values.roles.split(',') as RoleEnum[]);
    onboarding.setRoles(new Set(roles));

    const newFlow =
      roles.has('ATTORNEY') || roles.has('LEGAL_FELLOW')
        ? [
            { name: 'Roles', url: 'roles' },
            { name: 'Basic Info', url: 'basic-information' },
            { name: 'Availability', url: 'availability' },
            { name: 'Legal Experience', url: 'legal-experience' },
            { name: 'Done', url: 'done' },
          ]
        : [
            { name: 'Roles', url: 'roles' },
            { name: 'Basic Info', url: 'basic-information' },
            { name: 'Availability', url: 'availability' },
            { name: 'Done', url: 'done' },
          ];

    onboarding.setFlow(newFlow);
    onboarding.setProgress(1);
    push(`/onboarding/${newFlow[1].url}`);
  };

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roles: (onboarding
        ? Array.from(onboarding.roles.values() || []).join(',')
        : '') as RoleOptionType,
    },
  });

  return (
    <FormProvider {...form}>
      <FormDiv onSubmit={form.handleSubmit(onSubmit)}>
        <H1>Role</H1>

        <FormField
          control={form.control}
          name="roles"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>What role(s) would you like to add?</FormLabel>
              <FormControl>
                <InputDropdown
                  error={!!fieldState.error}
                  onChange={v => field.onChange(v ?? '')}
                  options={roleOptions}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <BigButton type="submit" disabled={!form.formState.isValid}>
          Continue
        </BigButton>
      </FormDiv>
    </FormProvider>
  );
}
