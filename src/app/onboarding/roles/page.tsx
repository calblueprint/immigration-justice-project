'use client';

import InputDropdown from '@/components/InputDropdown';
import { H1 } from '@/styles/text';
import { RoleEnum } from '@/types/schema';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext } from 'react';

const roleOptions = new Map<string, string>([
  ['ATTORNEY', 'Attorney'],
  ['INTERPRETER', 'Interpreter'],
  ['LEGAL_FELLOW', 'Legal Fellow'],
  ['ATTORNEY,INTERPRETER', 'Attorney and Interpreter'],
  ['LEGAL_FELLOW,INTERPRETER', 'Legal Fellow and Interpreter'],
]);

export default function Page() {
  const onboarding = useContext(OnboardingContext);

  const setRoles = (role: string) => {
    if (!onboarding) return;

    const roles = new Set(role.split(',') as RoleEnum[]);
    onboarding.setRoles(new Set(roles));

    if (roles.has('ATTORNEY') || roles.has('LEGAL_FELLOW')) {
      onboarding.setFlow([
        { name: 'Roles', url: 'roles' },
        { name: 'Basic Info', url: 'basic-information' },
        { name: 'Availability', url: 'availability' },
        { name: 'Legal Experience', url: 'legal-experience' },
        { name: 'Done', url: 'done' },
      ]);
    } else {
      onboarding.setFlow([
        { name: 'Roles', url: 'roles' },
        { name: 'Basic Info', url: 'basic-information' },
        { name: 'Availability', url: 'availability' },
        { name: 'Done', url: 'done' },
      ]);
    }
  };

  return (
    <>
      <H1>Roles</H1>

      <InputDropdown
        label="What role(s) would you like to hold?"
        onChange={v => setRoles(v ?? '')}
        options={roleOptions}
      />
    </>
  );
}
