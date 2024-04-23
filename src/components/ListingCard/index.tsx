'use client';

import { useMemo } from 'react';
import { UUID } from 'crypto';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H4, P } from '@/styles/text';
import { Listing } from '@/types/schema';
import { formatTimestamp, parseAgency } from '@/utils/helpers';
import Icon from '../Icon';
import * as Styles from './styles';

export default function ListingCard({
  listing,
  isSelected = false,
  onClick,
  interpretation = false,
}: {
  listing: Listing;
  isSelected?: boolean;
  onClick?: (id: UUID) => void;
  interpretation?: boolean;
}) {
  // list of tags to display
  const cardTags = useMemo(() => {
    const tags = [];

    if (listing.listing_type === 'CASE') {
      if (
        !interpretation &&
        listing.relief_codes &&
        listing.relief_codes.length > 0
      ) {
        tags.push(listing.relief_codes.join(', '));
      }

      if (listing.hours_per_week) {
        tags.push(`${listing.hours_per_week} hrs/week`);
      }
    }

    // language tag
    if (listing.languages && listing.languages.length > 0) {
      let langTag = listing.languages.slice(0, 2).join(', ');
      if (listing.languages.length > 2)
        langTag += ` + ${listing.languages.length - 2}`;
      tags.push(langTag);
    }

    // case interpretation
    if (listing.listing_type === 'CASE' && interpretation) {
      tags.push('Case Interpretation');
    }

    // limited case assignment
    if (listing.listing_type === 'LCA') {
      tags.push(listing.country);
    }

    // language support
    if (listing.listing_type === 'DOC') {
      const plural = listing.num_pages > 1 ? 's' : '';
      tags.push(`${listing.num_pages} page${plural}`);
      tags.push('Document Translation');
    }

    if (listing.listing_type === 'INT') {
      tags.push('Interpretation');
    }

    return tags;
  }, [listing, interpretation]);

  // remote info
  const remoteInfo = useMemo(() => {
    if (listing.listing_type === 'CASE' || listing.listing_type === 'INT')
      return `${listing.is_remote ? 'Remote' : 'In Person'}`;
    return 'Asynchronous';
  }, [listing]);

  return (
    <Styles.CardBody
      $selected={isSelected}
      onClick={() => onClick?.(listing.id)}
    >
      <H4>{listing.title || 'Migrant seeking representation'}</H4>

      {cardTags.length > 0 && (
        <Styles.TagRow>
          {cardTags.map(s => (
            <Styles.CardTag key={s} color={COLORS.blueLight}>
              {s}
            </Styles.CardTag>
          ))}
        </Styles.TagRow>
      )}

      <Flex $gap="16px">
        <Styles.IconTextGroup>
          <Icon type="location" />
          <P>{remoteInfo}</P>
        </Styles.IconTextGroup>

        {listing.listing_type === 'CASE' &&
        !interpretation &&
        listing.adjudicating_agency ? (
          <Styles.IconTextGroup>
            <Icon type="gavel" />
            <P>{parseAgency(listing.adjudicating_agency)}</P>
          </Styles.IconTextGroup>
        ) : null}
      </Flex>

      {listing.listing_type !== 'INT' ? (
        <Flex $align="center" $gap="8px">
          <Icon type="calendar" />
          <P>
            <strong>
              {listing.listing_type === 'CASE'
                ? 'Next Filing/Court Date:'
                : 'Assignment Deadline:'}
            </strong>
            &nbsp;
            {listing.listing_type === 'CASE'
              ? formatTimestamp(listing.upcoming_date)
              : formatTimestamp(listing.deadline)}
          </P>
        </Flex>
      ) : null}
    </Styles.CardBody>
  );
}
