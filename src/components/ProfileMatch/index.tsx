'use client';

import { H3, LinkColored, P } from "@/styles/text";
import Icon from "../Icon";
import { Flex } from "@/styles/containers";
import { CaseListing, DocumentTranslation, LimitedCaseAssignment, Listing, Profile } from "@/types/schema";
import { useProfile } from '@/utils/ProfileProvider';
import { timestampStringToDate, formatTimestamp, parseLanguageList } from "@/utils/helpers";
import CONFIG from "@/lib/configs";
import COLORS from "@/styles/colors";

interface MatchField<T extends Listing> {
  getMatch: (data: T, profileData: Profile) => boolean | undefined;
  getText: (data: T, profileData: Profile, match: boolean) => string;
}

const timeCommitmentMatch : MatchField<CaseListing> = {
  getMatch: (data, profileData: Profile) => data.hours_per_week ? profileData.hours_per_month > data.hours_per_week * 4 : undefined,
  getText: (data, profileData: Profile, match: boolean) => data.hours_per_week ? `Your time commitment ${profileData.hours_per_month} meets the minimum for this case ${data.hours_per_week * 4} hours/month).` :  'No information available about Time Commitment', 
};

const locationMatch : MatchField<CaseListing> = {
  getMatch: (data, profileData) => data.client_location ? undefined : data.client_location === profileData.location,
  getText: (data, profileData, match) => typeof match === 'undefined' ? 'No information available about Client Location' : `This client is ${match ? '' : 'not '}in your city.`,
};

const startDate : MatchField<CaseListing | LimitedCaseAssignment | DocumentTranslation > = {
  getMatch: (data, profileData) => {
    if (data.listing_type === 'CASE') {
      return data.upcoming_date ? timestampStringToDate(profileData.start_date) < timestampStringToDate(data.upcoming_date) : undefined; 
    }
    if (data.listing_type === 'DOC' || data.listing_type === 'LCA') {
      return data.deadline ? timestampStringToDate(profileData.start_date) < timestampStringToDate(data.deadline) : undefined; 
    }
  },
  getText: (data, profileData, match) => typeof match === 'undefined' ? `No information available about the ${data.listing_type === 'CASE' ? 'Next Court Hearing/Filing Date' : 'Deadline'}` : `The next ${data.listing_type === 'CASE' ? 'court hearing/filing date' :'deadline'} (${formatTimestamp(data.listing_type === 'CASE' ? data.upcoming_date : data.deadline)}) is ${match ? 'after' : 'before'} your first available start date (${formatTimestamp(profileData.start_date)}).`,
};

const languageMatch : MatchField<Listing> = {
  getMatch: (data, profileData) => { profileData
    // const languages = await fetchLanguagesById(profile.user_id); 
    return undefined; 
  },
  getText: (data, profileData, match) => `You ${match ? '' : "don't "}list ${data.languages.join(',')} as one of your languages`
};

const matchIcon = (match: boolean | undefined) => {
  if (typeof match === undefined) {
    return  <Icon type="green_check" /> // change to yellowExclaimation
  }
  if (match) {
    return <Icon type="green_check" />; // rename to greenCheck later 
  } 
  return  <Icon type="redCross" />; 
}

export default function ProfileMatch({listingData, interpretation = false} : {listingData: Listing, interpretation?: boolean}) {
  const profile = useProfile();
  const matchedLanguages = profile ? profile.languages.filter((l) => listingData.listing_type === 'DOC' ? l.can_read : l.can_speak).map(l => l.language_name).filter((l) => listingData.languages.includes(l)) : [];

  return (
    
    <Flex $direction="column" $gap="30px">
      <H3>Profile Match</H3>
      <Flex $direction="column" $gap="15px">
        { listingData.listing_type === 'CASE' && !interpretation && 
        <Flex $gap='16px'>
          {matchIcon(true)}
        </Flex>
        }
        {listingData.listing_type !== 'DOC' && 
        <Flex $gap='16px'>
          {matchIcon(listingData.listing_type === 'CASE' && !interpretation && matchedLanguages.length === 0 ? undefined : matchedLanguages.length > 0)}
          <P>You {matchedLanguages.length > 0 ? '' : "don't "}list {matchedLanguages.length > 0 ? parseLanguageList(matchedLanguages) : parseLanguageList(listingData.languages)} in your languages.</P>
        </Flex>
        }
      </Flex>
      <Flex>
        <P>Go to <LinkColored $color={COLORS.blueMid} href={CONFIG.settings}>Profile</LinkColored> to change any information.</P>
      </Flex>
    </Flex>
  )
};
