import React from 'react';
import styled from 'styled-components';

interface BigButtonProps {
  color: string;
  onChange: () => void;
}

const BigButton = styled.button<BigButtonProps>`
  background-color: ${props => props.color || 'blue'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
