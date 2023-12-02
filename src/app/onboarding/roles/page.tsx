'use client';

import InputDropdown from '@/components/InputDropdown';
import { RoleEnum } from '@/types/schema';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext, useEffect } from 'react';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  // const [roles, setRoles] = useState<Set<RoleEnum>>(new Set());
  const roleOptions = new Set(['Attorney', 'Interpreter']);

  useEffect(() => {
    onboarding?.setCanContinue(false);
  }, []);

  const setRoles = (v: Set<RoleEnum>) => {
    onboarding?.setRoles(v);
    if (v.size !== 0) {
      onboarding?.setCanContinue(true);
    } else {
      onboarding?.setCanContinue(false);
    }
  };

  return (
    <>
      <H1>Roles</H1>

      <InputDropdown
        label="What role(s) would you like to hold?"
        multi
        onChange={v => setRoles(v as Set<RoleEnum>)}
        options={roleOptions}
      ></InputDropdown>
    </>
  );
}
