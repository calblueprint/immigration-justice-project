import React from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { timestampStringToDate, parseDate } from '@/utils/helpers';
import { H2 } from '@/styles/text';
import COLORS from '@/styles/colors';
import { CardBody, TagRow, CardTag } from './styles';

export default function ListingCard({
  caseData,
  isSelected = false,
  onClick,
}: {
  caseData: CaseListing;
  isSelected?: boolean;
  onClick?: (id: UUID) => void;
}) {
  return (
    <CardBody
      $selected={isSelected}
      onClick={onClick ? () => onClick(caseData.id) : undefined}
    >
      {/* hard-coded for now */}
      <H2>Case title.</H2>
      {caseData.upcoming_date && (
        <p>
          <strong>Case Deadline: </strong>
          {parseDate(timestampStringToDate(caseData.upcoming_date))}
        </p>
      )}
      <TagRow>
        {caseData.needs_interpreter && (
          <CardTag color={COLORS.blueLight}>Interpreter needed</CardTag>
        )}
      </TagRow>
    </CardBody>
  );
}
