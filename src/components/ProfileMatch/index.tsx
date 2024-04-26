'use client';

import { useMemo } from 'react';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H3, LinkColored, P } from '@/styles/text';
import {
  CaseListing,
  DocumentTranslation,
  LimitedCaseAssignment,
  Listing,
  Profile,
} from '@/types/schema';
import {
  formatTimestamp,
  parseLanguageList,
  timestampStringToDate,
} from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import Icon from '../Icon';
import { IconDiv } from './styles';

interface MatchField<T extends Listing> {
  getMatch: (data: T, profileData: Profile) => boolean | undefined;
  getText: (
    data: T,
    profileData: Profile,
    match: boolean | undefined,
  ) => string;
}

const timeCommitmentMatch: MatchField<CaseListing> = {
  getMatch: (data, profileData) =>
    data.hours_per_week
      ? profileData.hours_per_month > data.hours_per_week * 4
      : undefined,
  getText: (data, profileData, match) =>
    data.hours_per_week
      ? `Your time commitment (${profileData.hours_per_month} hours/month) ${
          match ? 'meets' : 'does not meet'
        } the minimum for this case (${data.hours_per_week * 4} hours/month).`
      : 'No information available about Time Commitment',
};

const startDateMatch: MatchField<
  CaseListing | LimitedCaseAssignment | DocumentTranslation
> = {
  getMatch: (data, profileData) => {
    const date =
      data.listing_type === 'CASE' ? data.upcoming_date : data.deadline;
    return date
      ? timestampStringToDate(profileData.start_date) <=
          timestampStringToDate(date)
      : undefined;
  },
  getText: (data, profileData, match) =>
    match === undefined
      ? `No information available about the ${
          data.listing_type === 'CASE'
            ? 'Next Court Hearing/Filing Date'
            : 'Deadline'
        }`
      : `The ${
          data.listing_type === 'CASE'
            ? 'next court hearing/filing date'
            : 'deadline'
        } (${formatTimestamp(
          data.listing_type === 'CASE' ? data.upcoming_date : data.deadline,
        )}) is ${
          match ? 'after' : 'before'
        } your first available start date (${formatTimestamp(
          profileData.start_date,
        )}).`,
};

const matchIcon = (match: boolean | undefined) => {
  if (match === undefined) {
    return <Icon type="gray_dot" />;
  }
  if (match) {
    return <Icon type="green_check" />; // rename to greenCheck later
  }
  return <Icon type="redCross" />;
};

export default function ProfileMatch({
  listingData,
  interpretation = false,
}: {
  listingData: Listing;
  interpretation?: boolean;
}) {
  const profile = useProfile();
  if (!profile) {
    throw new Error(
      'Profile must be complete before ProfileMatch is displayed.',
    );
  }
  const { languages, profileData } = profile;
  const matchedLanguages = useMemo(
    () =>
      languages
        .filter(l =>
          listingData.listing_type === 'DOC' ? l.can_read : l.can_speak,
        )
        .map(l => l.language_name)
        .filter(l => listingData.languages.includes(l)),
    [languages, listingData.languages, listingData.listing_type],
  );

  const renderIconGroup = (fields: MatchField<Listing>) => {
    if (!profileData) {
      return null;
    }
    const match = fields.getMatch(listingData, profileData);
    return (
      <Flex $align="center" $gap="16px">
        <IconDiv>{matchIcon(match)}</IconDiv>
        <P>{fields.getText(listingData, profileData, match)}</P>
      </Flex>
    );
  };

  return (
    <Flex $direction="column" $gap="30px">
      <H3>Profile Match</H3>
      <Flex $direction="column" $gap="15px">
        {listingData.listing_type === 'CASE' && (
          <>{renderIconGroup(timeCommitmentMatch as MatchField<Listing>)}</>
        )}
        {listingData.listing_type !== 'INT' &&
          renderIconGroup(startDateMatch as MatchField<Listing>)}
        <Flex $align="center" $gap="16px">
          <IconDiv>
            {listingData.listing_type === 'CASE' &&
            !interpretation &&
            matchedLanguages.length === 0 ? (
              <Icon type="yellowExclamation" />
            ) : (
              matchIcon(matchedLanguages.length > 0)
            )}
          </IconDiv>
          <P>
            You {matchedLanguages.length > 0 ? '' : "don't "}list{' '}
            {matchedLanguages.length > 0
              ? parseLanguageList(matchedLanguages, false)
              : parseLanguageList(listingData.languages, true)}{' '}
            in your languages.
          </P>
        </Flex>
      </Flex>
      <Flex>
        <P>
          Go to{' '}
          <LinkColored $color={COLORS.blueMid} href={CONFIG.settings}>
            Profile
          </LinkColored>{' '}
          to update any information.
        </P>
      </Flex>
    </Flex>
  );
}
