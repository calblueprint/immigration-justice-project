import React from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '../../types/schemaTypes';
import timestampStringToDate from '../../utils/helpers';
import { CardBody, CardTitle, TagRow, CardTag } from './styles';

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
            color={r === 'Interpreter' ? interpreterColor : attorneyColor}
          >
            {r}
          </CardTag>
        ))}
      </TagRow>
    </CardBody>
  );
}
