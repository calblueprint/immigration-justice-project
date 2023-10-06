import React from 'react';
import styled from 'styled-components';

// styled components
const Tag = styled.span`
  border-radius: 100px;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
`;

export default function CardTag({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return <Tag style={{ backgroundColor: color }}>{text}</Tag>;
}
