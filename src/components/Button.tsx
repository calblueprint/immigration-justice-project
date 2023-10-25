import styled from 'styled-components';
import COLORS from '../styles/colors';

export const Button = styled.button<{ $secondary?: boolean }>`
  /* Adapt the colors based on the secondary prop */
  color: ${props => (props.$secondary ? 'black' : 'white')};
  background: ${props => (props.$secondary ? 'white' : COLORS.blueMid)};

  appearance: none;
  align-self: flex-end;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid ${COLORS.blueMid};
  &:hover {
    background: ${props =>
      props.$secondary ? '#f2f2f2' : COLORS.ijpBlueClicked};
    border-color: ${COLORS.ijpBlueClicked};
  }
`;

export const ErrorButton = styled(Button)<{ $secondary?: boolean }>`
  /* Adapt the colors based on the secondary prop for error buttons */
  background: ${props => (props.$secondary ? 'white' : COLORS.redMid)};
  border: 2px solid ${COLORS.redMid};
  &:hover {
    background: ${props =>
      props.$secondary ? '#f2f2f2' : COLORS.errorColorClicked};
    border-color: ${COLORS.errorColorClicked};
  }
`;
