import styled from 'styled-components';
import COLORS from '../styles/colors';

export const Button = styled.button<{ $secondary?: boolean }>`
  /* Adapt the colors based on the primary prop */
  color: ${props => (props.$secondary ? 'black' : 'white')};
  background: ${props => (props.$secondary ? 'white' : COLORS.blueMid)};

  appearance: none;
  align-self: flex-end;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid ${COLORS.blueMid};
`;

export const ErrorButton = styled(Button)<{ $secondary?: boolean }>`
  /* Adapt the colors based on the primary prop for error buttons */
  background: ${props => (props.$secondary ? 'white' : COLORS.blueMid)};
  border: 2px solid ${COLORS.blueMid};
`;
