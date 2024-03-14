'use client';

import { Listing } from '@/types/schema';
import { useMemo } from 'react';
import { parseAgency, formatTimestamp } from '@/utils/helpers';
import { P, H4 } from '@/styles/text';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import Icon from '../Icon';
import { CardBody, TagRow, CardTag, IconTextGroup } from './styles';

export default function ListingCard({
  listing,
  isSelected = false,
  onClick,
  interpretation = false,
}: {
  listing: Listing;
  isSelected?: boolean;
  onClick?: (id: string) => void;
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
      let langTag = listing.languages[0];
      if (listing.languages.length > 1)
        langTag += ` + ${listing.languages.length - 1}`;
      tags.push(langTag);
    }

    // case interpretation
    if (listing.listing_type === 'CASE' && interpretation) {
      if (listing.country) tags.push(listing.country);

      tags.push('Case Interpretation');
    }

    // limited case assignment
    if (listing.listing_type === 'LCA') {
      tags.push(listing.country);
      tags.push(listing.deliverable);
    }

    // language support
    if (listing.listing_type === 'LS') {
      if (listing.num_pages) {
        tags.push(`${listing.num_pages} pages`);
        tags.push('Document Translation');
      } else {
        tags.push('Interpretation');
      }
    }

    return tags;
  }, [listing, interpretation]);

  // remote info
  const remoteInfo = useMemo(() => {
    if (listing.listing_type !== 'CASE') return '';
    return `${listing.is_remote ? 'Remote' : 'In Person'}`;
  }, [listing]);

  return (
    <CardBody
      $selected={isSelected}
      onClick={() =>
        onClick?.(
          listing.listing_type === 'CASE'
            ? listing.legal_server_id
            : listing.id,
        )
      }
    >
      <H4>{listing.title || 'Migrant seeking representation'}</H4>

      <TagRow>
        {cardTags.map(s => (
          <CardTag key={s} color={COLORS.blueLight}>
            {s}
          </CardTag>
        ))}
      </TagRow>

      {listing.listing_type === 'CASE' && (
        <Flex $gap="1rem">
          <IconTextGroup>
            <Icon type="location" />
            <P>{remoteInfo}</P>
          </IconTextGroup>

          {!interpretation && listing.adjudicating_agency ? (
            <IconTextGroup>
              <Icon type="gavel" />
              <P>{parseAgency(listing.adjudicating_agency)}</P>
            </IconTextGroup>
          ) : null}
        </Flex>
      )}

      {!(listing.listing_type === 'LS' && !listing.num_pages) ? (
        <P>
          <strong>
            {listing.listing_type === 'CASE'
              ? 'Next Filing/Court Date:'
              : 'Assignment Deadline:'}
          </strong>{' '}
          {listing.listing_type === 'CASE'
            ? formatTimestamp(listing.upcoming_date)
            : formatTimestamp(listing.deadline)}
        </P>
      ) : null}
    </CardBody>
  );
}
