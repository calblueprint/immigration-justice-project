import { UnstyledButton } from '@/components/Buttons';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 40px;
  padding-bottom: 180px;
`;

export const FormContainer = styled.div`
  display: grid;
  place-items: center;
  flex-grow: 2;
  width: 100%;
`;

export const FormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: min(528px, 100%);
  margin: auto;
  gap: 40px;
`;

export const LogoImage = styled(Image)<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'unset' : 'none')};
  cursor: pointer;
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 50px;
  gap: 40px;
  border: 1px solid ${COLORS.greyLight};
  border-radius: 10px;
`;

export const SectionField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const BackLinkStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 30px;
  margin-left: 30px;
  transition: 100ms;
  padding: 10px;
  cursor: pointer;

  &:hover {
    transform: translateX(-2px);
  }
`;

export const BackLink = styled(Link)`
  ${BackLinkStyles}
`;

export const BackLinkButton = styled(UnstyledButton)`
  ${BackLinkStyles}
`;

export const RequiredText = styled(P)`
  position: absolute;
  top: 30px;
  right: 30px;
  color: ${COLORS.redMid};
  text-align: right;

  &::before {
    content: '* ';
  }
`;

export const EditText = styled(P)`
  font-weight: 600;
  text-decoration: underline;
`;
