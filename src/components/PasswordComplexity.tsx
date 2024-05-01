import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
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
  ${sans.style}
  color: ${props => (props.met ? COLORS.green : COLORS.greyMid)};
`;

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <PasswordRequirementDiv met={met}>
      <Icon type={met ? 'greenCheck' : 'grayDot'} />
      <PasswordRequirementText met={met}>{text}</PasswordRequirementText>
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
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const longEnough = password.length >= 8;

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
      </PasswordComplexityDiv>
    );
  }
  return null;
}
