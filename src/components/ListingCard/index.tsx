import React, { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { getCaseLanguages, getCaseReliefs } from '@/api/supabase/queries/cases';
import { timestampStringToDate, parseDate } from '@/utils/helpers';
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
  const [languages, setLanguages] = useState<{ iso_code: string }[]>([]);
  const [reliefs, setReliefs] = useState<{ relief_code: string }[]>([]);

  useEffect(() => {
    (async () => {
      const caseLanguages = await getCaseLanguages(caseData.id);
      const caseReliefs = await getCaseReliefs(caseData.id);
      setLanguages(caseLanguages);
      setReliefs(caseReliefs);
    })();
  });

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

    if (reliefs && reliefs.length > 0) {
      tags.push(reliefs.map(r => r.relief_code).join(', '));
    }

    if (caseData.hours_per_month) {
      tags.push(`${caseData.hours_per_month} hrs/month`);
    }

    if (languages && languages.length > 0) {
      tags.push(languages.map(l => l.iso_code).join(', '));
    }

    return tags;
  };

  function formatAdjudicatingAgency(text: string) {
    // Split the text into words
    const words = text.split('_');

    if (words.length === 1) {
      return text;
    }
    // Capitalize the first letter of each word
    const formattedWords = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );

    // Join the words back together
    const formattedText = formattedWords.join(' ');

    return formattedText;
  }

  const remoteInfo = `${caseData.is_remote ? 'Remote' : 'In Person'}${
    caseData.adjudicating_agency
      ? `, ${formatAdjudicatingAgency(caseData.adjudicating_agency)}`
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
