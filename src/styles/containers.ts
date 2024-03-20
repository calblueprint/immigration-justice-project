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
  $radius?: string;
  $w?: string;
  $h?: string;
  $align?: 'center' | 'start' | 'end';
  $justify?: 'center' | 'start' | 'end';
  $wrap?: boolean;
  $minW?: string;
  $maxW?: string;
  $minH?: string;
  $maxH?: string;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  gap: ${({ $gap }) => $gap || '0px'};
  padding: ${({ $p, $px, $py }) => $p || `${$py} ${$px}` || '0'};
  margin: ${({ $m, $mx, $my }) => $m || `${$my} ${$mx}` || '0'};
  border-radius: ${({ $radius }) => $radius || '0'};
  width: ${({ $w }) => $w};
  min-width: ${({ $minW }) => $minW};
  max-width: ${({ $maxW }) => $maxW};
  height: ${({ $h }) => $h};
  min-height: ${({ $minH }) => $minH};
  max-height: ${({ $maxH }) => $maxH};
  align-items: ${({ $align }) =>
    $align === 'center' ? $align : `flex-${$align}`};
  justify-content: ${({ $justify }) =>
    $justify === 'center' ? $justify : `flex-${$justify}`};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : null)};
`;
