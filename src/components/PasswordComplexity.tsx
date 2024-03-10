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
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const longEnough = password.length >= 8;

  if (longEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecial) {
    setComplexity(true);
  } else {
    setComplexity(false);
  }

  if (password.length > 0) {
    return (
      <PasswordComplexityDiv>
        <PasswordRequirementDiv met={longEnough}>
          <Icon type={hasUpperCase ? 'green_check' : 'gray_dot'} />
          <PasswordRequirementText met={hasUpperCase}>
            At least 1 uppercase character
          </PasswordRequirementText>
        </PasswordRequirementDiv>
        <PasswordRequirementDiv met={hasLowerCase}>
          <Icon type={hasLowerCase ? 'green_check' : 'gray_dot'} />
          <PasswordRequirementText met={hasLowerCase}>
            At least 1 lowercase character
          </PasswordRequirementText>
        </PasswordRequirementDiv>
        <PasswordRequirementDiv met={hasNumber}>
          <Icon type={hasNumber ? 'green_check' : 'gray_dot'} />
          <PasswordRequirementText met={hasNumber}>
            At least 1 number
          </PasswordRequirementText>
        </PasswordRequirementDiv>
        <PasswordRequirementDiv met={hasSpecial}>
          <Icon type={hasSpecial ? 'green_check' : 'gray_dot'} />
          <PasswordRequirementText met={hasSpecial}>
            At least 1 special character
          </PasswordRequirementText>
        </PasswordRequirementDiv>
        <PasswordRequirementDiv met={longEnough}>
          <Icon type={longEnough ? 'green_check' : 'gray_dot'} />
          <PasswordRequirementText met={longEnough}>
            At least 8 characters
          </PasswordRequirementText>
        </PasswordRequirementDiv>
      </PasswordComplexityDiv>
    );
  }
  return null;
}
