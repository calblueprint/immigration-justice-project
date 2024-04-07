import styled from 'styled-components';
import { openSans } from '@/styles/fonts';
import COLORS from '@/styles/colors';
import { Dispatch, SetStateAction } from 'react';
import Icon from './Icon';

const PasswordComplexityDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const PasswordRequirementDiv = styled.div<{ met: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PasswordRequirementText = styled.p<{ met: boolean }>`
  ${openSans.style}
  color: ${props => (props.met ? COLORS.green : COLORS.greyMid)};
`;

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <PasswordRequirementDiv met={met}>
      <Icon type={met ? 'green_check' : 'gray_dot'} />
      <PasswordRequirementText met={met}>{text}</PasswordRequirementText>
    </PasswordRequirementDiv>
  );
}

function isExistingPassword(password: string) {
  return password.length > 0; // TODO: replace with a check to see if the password allows the user to log in once we have auth context
}

export default function PasswordComplexity({
  password,
  setComplexity,
  isReset = false,
}: {
  password: string;
  setComplexity: Dispatch<SetStateAction<boolean>>;
  isReset?: boolean;
}) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const longEnough = password.length >= 8;
  const existingPassword = isReset ? isExistingPassword(password) : true;

  if (hasUpperCase && hasLowerCase && hasNumber && longEnough) {
    setComplexity(true);
  } else {
    setComplexity(false);
  }

  if (password.length > 0) {
    return (
      <PasswordComplexityDiv>
        <PasswordRequirement
          met={hasUpperCase}
          text="At least 1 uppercase character"
        />
        <PasswordRequirement
          met={hasLowerCase}
          text="At least 1 lowercase character"
        />
        <PasswordRequirement met={hasNumber} text="At least 1 number" />
        <PasswordRequirement met={longEnough} text="At least 8 characters" />
        <PasswordRequirement
          met={existingPassword}
          text="New password must be different from previous password"
        />
      </PasswordComplexityDiv>
    );
  }
  return null;
}
