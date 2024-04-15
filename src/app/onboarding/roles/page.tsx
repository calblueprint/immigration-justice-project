'use client';

import { BigBlueButton } from '@/components/Buttons';
import InputDropdown from '@/components/InputDropdown';
import { H1, P } from '@/styles/text';
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
import { FlowData } from '@/types/misc';
import {
  ATTORNEY_FLOW,
  INTERPRETER_FLOW,
  LEGAL_FELLOW_FLOW,
} from '@/data/onboardingFlows';
import { Callout, Flex, SmallCardForm } from '@/styles/containers';
import Icon from '@/components/Icon';
import { ROLE_DESCRIPTIONS } from '@/data/roleDescriptions';

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

    const roles = values.roles.split(',') as RoleEnum[];
    onboarding.setRoles(roles);

    let newFlow: FlowData[];

    if (roles.includes('ATTORNEY')) {
      newFlow = ATTORNEY_FLOW;
    } else if (roles.includes('LEGAL_FELLOW')) {
      newFlow = LEGAL_FELLOW_FLOW;
    } else {
      newFlow = INTERPRETER_FLOW;
    }

    // clear previously filled out data
    onboarding.clearProfile();

    onboarding.setFlow(newFlow);
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

  const { roles } = form.watch();

  return (
    <FormProvider {...form}>
      {/* div to fill top space, delete after nav bar is added */}
      <div style={{ paddingTop: '100px' }} />
      <SmallCardForm onSubmit={form.handleSubmit(onSubmit)}>
        <H1>Role</H1>

        <FormField
          control={form.control}
          name="roles"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>What role(s) would you like to hold?</FormLabel>
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

        {roles && (
          <Callout>
            <Flex $gap="10px">
              <Icon type="info" />
              <Flex $direction="column" $gap="16px">
                {roles.includes('ATTORNEY') && (
                  <P>
                    <b>Attorney:</b> {ROLE_DESCRIPTIONS.attorney}
                  </P>
                )}
                {roles.includes('LEGAL_FELLOW') && (
                  <P>
                    <b>Legal Fellow:</b> {ROLE_DESCRIPTIONS.legal_fellow}
                  </P>
                )}
                {roles.includes('INTERPRETER') && (
                  <P>
                    <b>Interpreter:</b> {ROLE_DESCRIPTIONS.interpreter}
                  </P>
                )}
              </Flex>
            </Flex>
          </Callout>
        )}

        {/* TODO: could consider using async button to display loading state */}
        <BigBlueButton type="submit" disabled={!form.formState.isValid}>
          Continue
        </BigBlueButton>
      </SmallCardForm>
    </FormProvider>
  );
}
