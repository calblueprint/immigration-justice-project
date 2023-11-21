import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { timestampStringToDate, parseDate, parseAgency } from '@/utils/helpers';
import { P, H4 } from '@/styles/text';
import COLORS from '@/styles/colors';
import Icon from '../../../assets/icons/Icon';
import { CardBody, TagRow, CardTag, IconTextGroup } from './styles';

export default function ListingCard({
  caseData,
  isSelected = false,
  onClick,
}: {
  caseData: CaseListing;
  isSelected?: boolean;
  onClick?: (id: UUID) => void;
}) {
  // Helper function to generate an array of strings for CardTag components
  const generateCardTags = (): string[] => {
    const tags = [];

    if (caseData.needs_interpreter && caseData.needs_attorney) {
      tags.push('Interpreter & Attorney');
    } else if (caseData.needs_interpreter) {
      tags.push('Interpreter');
    } else if (caseData.needs_attorney) {
      tags.push('Attorney');
    }

    if (caseData.relief_codes && caseData.relief_codes.length > 0) {
      tags.push(caseData.relief_codes.join(', '));
    }

    if (caseData.hours_per_month) {
      tags.push(`${caseData.hours_per_month} hrs/month`);
    }

    if (caseData.languages && caseData.languages.length > 0) {
      tags.push(caseData.languages.join(', '));
    }

    return tags;
  };

  const remoteInfo = `${caseData.is_remote ? 'Remote' : 'In Person'}${
    caseData.adjudicating_agency
      ? `, ${parseAgency(caseData.adjudicating_agency)}`
      : ''
  }`;

  return (
    <CardBody
      $selected={isSelected}
      onClick={onClick ? () => onClick(caseData.id) : undefined}
    >
      <H4>
        {caseData.title
          ? caseData.title
          : 'Guatemalan mother and two children seeking protection'}
      </H4>

      <TagRow>
        {generateCardTags().map(s => (
          <CardTag key={s} color={COLORS.blueLight}>
            {s}
          </CardTag>
        ))}
      </TagRow>

      <IconTextGroup>
        <Icon type="location" />
        <P>{remoteInfo}</P>
      </IconTextGroup>

      <P>
        <strong>Next Filing/Court Date: </strong>
        {caseData.upcoming_date
          ? parseDate(timestampStringToDate(caseData.upcoming_date))
          : 'N/A'}
      </P>
    </CardBody>
  );
}
