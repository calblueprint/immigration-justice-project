import styled from 'styled-components';

// styled components
export const CardBody = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 1rem;
  border-radius: 10px;
  transition: 150ms;
  cursor: pointer;
  gap: 1rem;

  ${({ $selected }) => $selected && `border-color: #097A62`};

  &:hover {
    box-shadow: 0 4px 4px 1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const CardTag = styled.span<{ color: string }>`
  border-radius: 100px;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  background: ${({ color }) => color};
`;
