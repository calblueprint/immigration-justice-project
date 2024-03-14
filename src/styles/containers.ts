import styled from 'styled-components';

export const Flex = styled.div<{
  $gap?: string;
  $direction?: 'column' | 'row';
  $px?: string;
  $py?: string;
  $p?: string;
  $mx?: string;
  $my?: string;
  $m?: string;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  gap: ${({ $gap }) => $gap || '0px'};
  padding: ${({ $p, $px, $py }) => $p || `${$py} ${$px}` || '0'};
  margin: ${({ $m, $mx, $my }) => $m || `${$my} ${$mx}` || '0'};
`;
