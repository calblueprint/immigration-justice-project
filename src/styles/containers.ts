import styled, { css } from 'styled-components';

interface BoxProps {
  $border?: string;
  $borderColor?: string;
  $radius?: string;
  $shadow?: string;
  $w?: string;
  $minW?: string;
  $maxW?: string;
  $h?: string;
  $minH?: string;
  $maxH?: string;
  $p?: string;
  $px?: string;
  $py?: string;
  $pl?: string;
  $pr?: string;
  $pt?: string;
  $pb?: string;
  $m?: string;
  $mx?: string;
  $my?: string;
  $ml?: string;
  $mt?: string;
  $mr?: string;
  $mb?: string;
  $position?: string;
}

const BoxStyles = css<BoxProps>`
  position: ${({ $position }) => $position ?? 'static'};

  border: ${({ $border }) => $border};
  border-color: ${({ $borderColor }) => $borderColor};
  border-radius: ${({ $radius }) => $radius};
  box-shadow: ${({ $shadow }) => $shadow};

  width: ${({ $w }) => $w ?? '100%'};
  min-width: ${({ $minW }) => $minW};
  max-width: ${({ $maxW }) => $maxW};
  height: ${({ $h }) => $h ?? '100%'};
  min-height: ${({ $minH }) => $minH};
  max-height: ${({ $maxH }) => $maxH};

  padding: ${({ $p }) => $p};
  ${({ $py, $pt }) => ($pt || $py ? `padding-top: ${$pt || $py}` : null)};
  ${({ $py, $pb }) => ($pb || $py ? `padding-bottom: ${$pb || $py}` : null)};
  ${({ $px, $pl }) => ($pl || $px ? `padding-left: ${$pl || $px}` : null)};
  ${({ $px, $pr }) => ($pr || $px ? `padding-right: ${$pr || $px}` : null)};

  margin: ${({ $m }) => $m};
  ${({ $my, $mt }) => ($mt || $my ? `padding-top: ${$mt || $my}` : null)};
  ${({ $my, $mb }) => ($mb || $my ? `padding-bottom: ${$mb || $my}` : null)};
  ${({ $mx, $ml }) => ($ml || $mx ? `padding-left: ${$ml || $mx}` : null)};
  ${({ $mx, $mr }) => ($mr || $mx ? `padding-right: ${$mr || $mx}` : null)};
`;

export const Box = styled.div<BoxProps>`
  ${BoxStyles}
`;

interface FlexProps extends BoxProps {
  $gap?: string;
  $direction?: 'column' | 'row';
  $align?: 'center' | 'start' | 'end';
  $justify?: 'center' | 'start' | 'end';
  $wrap?: boolean;
}

export const Flex = styled.div<FlexProps>`
  ${BoxStyles}
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  gap: ${({ $gap }) => $gap || '0px'};

  align-items: ${({ $align }) =>
    $align === 'center' ? $align : `flex-${$align}`};

  justify-content: ${({ $justify }) =>
    $justify === 'center' ? $justify : `flex-${$justify}`};

  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : null)};
`;

export const Fill = styled.div`
  width: 100%;
`;
