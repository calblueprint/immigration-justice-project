import React from 'react';
import styled from 'styled-components';
import CardTag from './CardTag';

// styled components
const CardBody = styled.div`
  border: 1px solid lightgray;
  padding: 1rem;
  border-radius: 10px;
  transition: 150ms;
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const TagRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function ListingCard({
  title,
  languages,
  deadline,
  rolesNeeded,
}: {
  title: string;
  languages: string[];
  deadline: Date;
  rolesNeeded: string[];
}) {
  // helper functions
  const parseDate = (d: Date): string =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  // temporary solution
  const attorneyColor = '#76aaca';
  const interpreterColor = '#82cf94';

  return (
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <p>
        <strong>Languages: </strong>
        {languages.join(', ')}
      </p>
      <p>
        <strong>Case Deadline: </strong>
        {parseDate(deadline)}
      </p>
      <TagRow>
        {rolesNeeded.map(r => (
          <CardTag
            key={r}
            text={r}
            color={r === 'Interpreter' ? interpreterColor : attorneyColor}
          />
        ))}
      </TagRow>
    </CardBody>
  );
}
