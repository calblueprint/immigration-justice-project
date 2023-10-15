import React from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '../../types/schemaTypes';
import { timestampStringToDate } from '../../utils/helpers';
import { CardBody, TagRow, CardTag } from './styles';
import { H2 } from '../../styles/text';
import COLORS from '../../styles/colors';

export default function ListingCard({
  caseData,
  isSelected = false,
  onClick,
}: {
  caseData: CaseListing;
  isSelected?: boolean;
  onClick?: (id: UUID) => void;
}) {
  // helper functions
  const parseDate = (d: Date): string =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  return (
    <CardBody
      $selected={isSelected}
      onClick={onClick ? () => onClick(caseData.id) : undefined}
    >
      {/* hard-coded for now */}
      <H2>Case title.</H2>
      <p>
        <strong>Languages: </strong>
        {caseData.languages.join(', ')}
      </p>
      <p>
        <strong>Case Deadline: </strong>
        {parseDate(timestampStringToDate(caseData.time_to_complete))}
      </p>
      <TagRow>
        {caseData.needs_interpreter && (
          <CardTag color={COLORS.interpreterColor}>Interpreter needed</CardTag>
        )}
      </TagRow>
    </CardBody>
  );
}
