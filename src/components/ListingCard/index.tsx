import React from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { timestampStringToDate, parseDate } from '@/utils/helpers';
import { P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { CardBody, TagRow, CardTag, CardTitle } from './styles';

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
      <CardTitle>
        Guatemalan mother and two children seeking protection
      </CardTitle>

      <TagRow>
        {caseData.needs_interpreter && caseData.needs_attorney && (
          <CardTag color={COLORS.blueLight}>
            Needs Interpreter & Attorney
          </CardTag>
        )}
        {caseData.needs_interpreter && !caseData.needs_attorney && (
          <CardTag color={COLORS.blueLight}>Needs Interpreter</CardTag>
        )}
        {!caseData.needs_interpreter && caseData.needs_attorney && (
          <CardTag color={COLORS.blueLight}>Needs Attorney</CardTag>
        )}
        {caseData.is_remote ? (
          <CardTag color={COLORS.blueLight}>Remote</CardTag>
        ) : (
          <CardTag color={COLORS.blueLight}>In Person</CardTag>
        )}
        {caseData.adjudicating_agency && (
          <CardTag color={COLORS.blueLight}>
            {caseData.adjudicating_agency}
          </CardTag>
        )}
      </TagRow>
      <P>
        <strong>Next Filing/Court Date: </strong>
        {caseData.upcoming_date
          ? parseDate(timestampStringToDate(caseData.upcoming_date))
          : 'Not Available'}
      </P>
    </CardBody>
  );
}
