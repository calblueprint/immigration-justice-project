import styled from 'styled-components';

/* 
  FOR PRIMARY BUTTON USAGE:

    Props: 
      $primarycolor (Required) - This color will determine the default background color of the button
      $secondarycolor (Required) - This color will determine the border color and background color on hover
   
    Example:
      <Button $primarycolor={COLORS.blueMid} $secondarycolor={COLORS.blueDark} onClick={...}>
        [Button text here]
      </Button>

  FOR SECONDARY BUTTON USAGE:

    Props:
      $primarycolor (Omit) - IMPORTANT: DO NOT PASS IN A $primarycolor PROP!!! The background color will be white by default
      $secondarycolor (Required) - This color will determine the border color and background color on hover

    Example: 
      <Button $secondarycolor={COLORS.blueMid} onClick={...}>
        [Button text here]
      </Button>
 */
const Button = styled.button<{
  $primarycolor?: string;
  $secondarycolor: string;
}>`
  appearance: none;
  color: ${props => (props.$primarycolor ? 'white' : 'black')};
  background: ${props => (props.$primarycolor ? props.$primarycolor : 'white')};
  align-self: flex-end;
  padding: 0.625rem 1.25rem;
  border-radius: 0.313rem; // 5px
  border: 2px solid
    ${props =>
      props.$primarycolor ? props.$primarycolor : props.$secondarycolor};
  &:hover {
    background: ${props => props.$secondarycolor};
    color: white;
    border-color: ${props => props.$secondarycolor};
  }
`;

export default Button;
