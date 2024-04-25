'use client';

import { H3, LinkColored, P } from '@/styles/text';
import { Flex } from '@/styles/containers';
import {
  CaseListing,
  DocumentTranslation,
  LimitedCaseAssignment,
  Listing,
  Profile,
} from '@/types/schema';
import { useProfile } from '@/utils/ProfileProvider';
import {
  timestampStringToDate,
  formatTimestamp,
  parseLanguageList,
} from '@/utils/helpers';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import Icon from '../Icon';

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
          match ? 'meeets' : 'does not meet'
        } the minimum for this case (${data.hours_per_week * 4} hours/month).`
      : 'No information available about Time Commitment',
};

const locationMatch: MatchField<CaseListing> = {
  getMatch: (data, profileData) =>
    data.client_location
      ? data.client_location === profileData.location
      : undefined,
  getText: (data, profileData, match) =>
    match === undefined
      ? 'No information available about Client Location'
      : `This client is ${match ? '' : 'not '}in your city.`,
};

const startDateMatch: MatchField<
  CaseListing | LimitedCaseAssignment | DocumentTranslation
> = {
  getMatch: (data, profileData) => {
    const date =
      data.listing_type === 'CASE' ? data.upcoming_date : data.deadline;
    return date
      ? timestampStringToDate(profileData.start_date) <
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
    return <Icon type="gray_dot" />; // change to yellowExclaimation
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
  const matchedLanguages = profile
    ? profile.languages
        .filter(l =>
          listingData.listing_type === 'DOC' ? l.can_read : l.can_speak,
        )
        .map(l => l.language_name)
        .filter(l => listingData.languages.includes(l))
    : [];

  const renderIconGroup = (fields: MatchField<Listing>) => {
    if (!profile?.profileData) {
      return null;
    }
    const match = fields.getMatch(listingData, profile.profileData);
    return (
      <Flex $gap="16px" $align="center">
        <Flex $w="15px" $h="15px">
          {matchIcon(match)}
        </Flex>
        <P>{fields.getText(listingData, profile.profileData, match)}</P>
      </Flex>
    );
  };

  return (
    <Flex $direction="column" $gap="30px">
      <H3>Profile Match</H3>
      <Flex $direction="column" $gap="15px">
        {listingData.listing_type === 'CASE' && (
          <>
            {renderIconGroup(timeCommitmentMatch as MatchField<Listing>)}
            {renderIconGroup(locationMatch as MatchField<Listing>)}
          </>
        )}
        {listingData.listing_type !== 'INT' &&
          renderIconGroup(startDateMatch as MatchField<Listing>)}
        <Flex $gap="16px">
          {matchIcon(
            listingData.listing_type === 'CASE' &&
              !interpretation &&
              matchedLanguages.length === 0
              ? undefined
              : matchedLanguages.length > 0,
          )}
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
