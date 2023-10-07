import React from 'react';
import styled from 'styled-components';
import { UUID } from 'crypto';
import { CaseListing } from '../types/schemaTypes';
import timestampStringToDate from '../utils/helpers';
import CardTag from './CardTag';

// styled components
const CardBody = styled.div<{ $selected?: boolean }>`
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
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
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
  caseData,
  isSelected = false,
  onClick,
}: {
  caseData: CaseListing;
  isSelected?: boolean;
  onClick?: (id: UUID) => void;
}) {
  // setup
  const rolesNeeded = ['Attorney'].concat(
    caseData.needs_interpreter ? ['Interpreter'] : [],
  );

  // helper functions
  const parseDate = (d: Date): string =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  // temporary solution
  const attorneyColor = '#85b4d2';
  const interpreterColor = '#8dd89f';

  return (
    <CardBody
      $selected={isSelected}
      onClick={onClick ? () => onClick(caseData.id) : undefined}
    >
      {/* hard-coded for now */}
      <CardTitle>Case title.</CardTitle>
      <p>
        <strong>Languages: </strong>
        {caseData.languages.join(', ')}
      </p>
      <p>
        <strong>Case Deadline: </strong>
        {parseDate(timestampStringToDate(caseData.time_to_complete))}
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
