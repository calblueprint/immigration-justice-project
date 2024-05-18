import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import Icon from './Icon';

const PasswordComplexityDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const PasswordRequirementDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PasswordRequirementText = styled(P)<{ $met: boolean }>`
  color: ${({ $met }) => ($met ? COLORS.green : COLORS.greyMid)};
`;

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <PasswordRequirementDiv>
      <Icon type={met ? 'greenCheck' : 'grayDot'} />
      <PasswordRequirementText $met={met}>{text}</PasswordRequirementText>
    </PasswordRequirementDiv>
  );
}

export default function PasswordComplexity({
  password,
  setComplexity,
}: {
  password: string;
  setComplexity: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const longEnough = password.length >= 8;

    const isComplex = hasUpperCase && hasLowerCase && hasNumber && longEnough;

    setComplexity(isComplex);
  }, [password, setComplexity]);

  if (password.length > 0) {
    return (
      <PasswordComplexityDiv>
        <PasswordRequirement
          met={/[A-Z]/.test(password)}
          text="At least 1 uppercase letter"
        />
        <PasswordRequirement
          met={/[a-z]/.test(password)}
          text="At least 1 lowercase letter"
        />
        <PasswordRequirement
          met={/\d/.test(password)}
          text="At least 1 number (0-9)"
        />
        <PasswordRequirement
          met={password.length >= 8}
          text="At least 8 characters"
        />
      </PasswordComplexityDiv>
    );
  }
  return null;
}
