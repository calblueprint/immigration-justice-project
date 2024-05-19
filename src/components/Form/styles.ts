import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';

export const Label = styled(H4)<{ $required?: boolean }>`
  display: inline-block;
  color: ${COLORS.greyDark};
  margin-bottom: 10px;
  ${({ $required }) =>
    $required
      ? `
    &:after {
      content: ' *';
      color: ${COLORS.redMid};
    }
  `
      : null};
`;

export const Message = styled(P)<{ $hasError?: boolean }>`
  color: ${({ $hasError }) => ($hasError ? COLORS.redMid : COLORS.greyDark)};
`;

export const Description = styled(P)`
  color: ${COLORS.greyMid};
  font-size: 0.875rem;
  margin: 0.625rem 0;
`;
