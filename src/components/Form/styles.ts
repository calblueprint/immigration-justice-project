import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';
import styled from 'styled-components';

export const Label = styled(H4)<{ $hasError: boolean }>`
  color: ${({ $hasError }) => ($hasError ? COLORS.redMid : COLORS.greyDark)};
  margin-bottom: 0.625rem; //10px
`;

// open for customization
export const Description = styled(P)``;
export const Message = styled(P)``;
