'use client';

import InputDropdown from '@/components/InputDropdown';
import { H1 } from '@/styles/text';
import { RoleEnum } from '@/types/schema';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext } from 'react';

const roleOptions = new Map<RoleEnum, string>([
  ['ATTORNEY', 'Attorney'],
  ['INTERPRETER', 'Interpreter'],
]);

export default function Page() {
  const onboarding = useContext(OnboardingContext);

  const setRoles = (roles: Set<RoleEnum>) => {
    onboarding?.setRoles(roles);
    if (roles.size !== 0) {
      onboarding?.setCanContinue(true);
    } else {
      onboarding?.setProgress(0);
      onboarding?.setCanContinue(false);
    }

    if (roles.has('ATTORNEY')) {
      onboarding?.setFlow([
        { name: 'Roles', url: 'roles' },
        { name: 'Basic Info', url: 'basic-information' },
        { name: 'Availability', url: 'availability' },
        { name: 'Legal Experience', url: 'legal-experience' },
        { name: 'Done', url: 'done' },
      ]);
    } else {
      onboarding?.setFlow([
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
        multi
        defaultValue={onboarding?.roles}
        onChange={v => setRoles(v as Set<RoleEnum>)}
        options={roleOptions}
      />
    </>
  );
}
