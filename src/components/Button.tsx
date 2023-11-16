import styled from 'styled-components';

/* 
  FOR PRIMARY BUTTON USAGE:

    Props: 
      $primaryColor (Required) - This color will determine the default background color of the button
      $secondaryColor (Required) - This color will determine the border color and background color on hover
   
    Example:
      <Button $primarycolor={COLORS.blueMid} $secondarycolor={COLORS.blueDark} onClick={...}>
        [Button text here]
      </Button>

  FOR SECONDARY BUTTON USAGE:

    Props:
      $primaryColor (Omit) - IMPORTANT: DO NOT PASS IN A primaryColor PROP!!! The background color will be white by default
      $secondaryColor (Required) - This color will determine the border color and background color on hover

    Example: 
      <Button $secondarycolor={COLORS.blueMid} onClick={...}>
        [Button text here]
      </Button>
 */
const Button = styled.button<{
  $primaryColor?: string;
  $secondaryColor: string;
}>`
  appearance: none;
  color: ${props => (props.$primaryColor ? 'white' : 'black')};
  background: ${props => (props.$primaryColor ? props.$primaryColor : 'white')};
  align-self: flex-end;
  padding: 0.625rem 1.25rem;
  border-radius: 0.313rem; // 5px
  border: 2px solid
    ${props =>
      props.$primaryColor ? props.$primaryColor : props.$secondaryColor};
  &:hover {
    background: ${props => props.$secondaryColor};
    color: white;
    border-color: ${props => props.$secondaryColor};
  }
`;

export default Button;
