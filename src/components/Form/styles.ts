import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';
import styled from 'styled-components';

export const Label = styled(H4)`
  color: ${COLORS.greyDark};
  margin-bottom: 0.625rem; //10px
`;

export const Description = styled(P)``;

export const Message = styled(P)<{ $hasError?: boolean }>`
  color: ${({ $hasError }) => ($hasError ? COLORS.redMid : COLORS.greyDark)};
`;
