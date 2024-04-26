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

const checkLocation = (
  clientLocation: string,
  city: string,
  state: string,
  country: string,
) => {
  // const usaRegex = [uU]\.?[sS]\.?[aA];
  // if (usaRegex.test(country)) { // country !== 'USA'
  //   return false
  // }
  const cl = clientLocation.split(', ');
  return cl[0].toUpperCase() === city.toUpperCase(); // && cl[1].toUpperCase() === state;
};

const locationMatch: MatchField<CaseListing> = {
  getMatch: (data, profileData) =>
    data.client_location
      ? checkLocation(
          data.client_location,
          profileData.city,
          profileData.state,
          profileData.country,
        ) // data.client_location === profileData.location
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
    return null;
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
    [languages],
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

  const renderLocationGroup = useMemo(() => {
    if (!profileData || listingData.listing_type !== 'CASE') {
      return null;
    }
    const match = locationMatch.getMatch(listingData, profileData);
    return (
      <Flex $align="center" $gap="16px">
        <IconDiv>
          {listingData.listing_type === 'CASE' &&
          !!listingData.is_remote && // listingData.is_remote !== false if we don't want gray_dot for null values of is_remote
          match === false ? (
            <Icon type="yellowExclamation" />
          ) : (
            matchIcon(match)
          )}
        </IconDiv>
        <P>{locationMatch.getText(listingData, profileData, match)}</P>
      </Flex>
    );
  }, [listingData, profileData]);

  return (
    <Flex $direction="column" $gap="30px">
      <H3>Profile Match</H3>
      <Flex $direction="column" $gap="15px">
        {listingData.listing_type === 'CASE' && (
          <>
            {renderIconGroup(timeCommitmentMatch as MatchField<Listing>)}
            {renderLocationGroup}
          </>
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
