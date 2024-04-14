import React, { useContext } from 'react';
import { ProfileContext } from '@/utils/ProfileProvider';
import { CaseListing, LanguageSupport, LimitedCaseAssignment } from '@/types/schema';



export default function ProfileMatch(){
  const profile = useContext(ProfileContext);
}

  const renderTimeCommitment = () => {
    if ('hours_per_month' in listing) {
      const { hours_per_month } = profile;
      const { hours_per_month: caseHours } = listing as CaseListing;
      return (
        <>
          {hours_per_month >= caseHours ? (
            <span>✅ Your time commitment ({hours_per_month}) meets the minimum for this listing ({caseHours}).</span>
          ) : (
            <span>❌ Your time commitment ({hours_per_month}) does not meet the minimum for this case ({caseHours}).</span>
          )}
        </>
      );
    }
    return null;
  };

  const renderLocation = () => {
    if ('location' in listing) {
      const { location: profileLocation } = profile;
      const { location: caseLocation } = listing as CaseListing;
      return (
        <>
          {profileLocation === caseLocation ? (
            <span>✅ The client is in your city.</span>
          ) : (
            <span>❌ The client is not in your city.</span>
          )}
        </>
      );
    }
    return null;
  };

  const renderLanguages = () => {
    if ('languages' in listing) {
      const { languages: clientLanguages } = listing as LanguageSupport;
      const matchedLanguages = profile.languages.filter(lang => clientLanguages.includes(lang));
      return (
        <>
          {matchedLanguages.length > 0 ? (
            <span>✅ You list {matchedLanguages.join(', ')} in your languages.</span>
          ) : (
            <span>❌ You don't list any of {clientLanguages.join(', ')} in your languages.</span>
          )}
        </>
      );
    }
    return null;
  };

  const renderDateOrDeadline = () => {
    if ('next_date' in listing) {
      const { start_date } = profile;
      const { next_date } = listing as Case | LimitedCaseAssignment;
      return (
        <>
          {start_date <= next_date ? (
            <span>✅ The next court hearing date / filing date ({next_date}) is after your first available start date ({start_date}).</span>
          ) : (
            <span>❌ The next court hearing date / filing date ({next_date}) is before your first available start date ({start_date}).</span>
          )}
        </>
      );
    } else if ('deadline' in listing) {
      const { start_date } = profile;
      const { deadline } = listing as DocumentTranslation | LimitedCaseAssignment;
      return (
        <>
          {start_date <= deadline ? (
            <span>✅ The assignment deadline ({deadline}) is after your first available start date ({start_date}).</span>
          ) : (
            <span>❌ The assignment deadline ({deadline}) is before your first available start date ({start_date}).</span>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <h3>Profile Match</h3>
      {renderTimeCommitment()}
      {renderLocation()}
      {renderLanguages()}
      {renderDateOrDeadline()}
    </div>
  );
};

