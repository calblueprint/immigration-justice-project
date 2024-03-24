'use client';

import { H1Centered, H2, H4, P } from '@/styles/text';
import { Flex } from '@/styles/containers';
import { BigBlueButton, BigLinkButton } from '@/components/Buttons';
import { formatTruthy, parseDate } from '@/utils/helpers';
import { useGuardedOnboarding } from '@/utils/hooks';
import * as Styles from '../styles';

export default function Page() {
  const onboarding = useGuardedOnboarding();

  return (
    <Styles.NormalFormDiv>
      <Flex $direction="column" $gap="30px">
        <H1Centered>Review & Submit</H1Centered>

        <Styles.SectionBox>
          <H2>Basic Information</H2>
          <Flex>
            <Styles.SectionField>
              <H4>First Name</H4>
              <P>{onboarding.profile.first_name}</P>
            </Styles.SectionField>
            <Styles.SectionField>
              <H4>Last Name</H4>
              <P>{onboarding.profile.last_name}</P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField>
              <H4>City</H4>
              <P>{onboarding.profile.location}</P>
            </Styles.SectionField>
            <Styles.SectionField>
              <H4>Phone Number</H4>
              <P>{onboarding.profile.phone_number ?? 'N/A'}</P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField>
              <H4>Languages (read and write)</H4>
              <P>
                {onboarding.canReads.length > 0
                  ? onboarding.canReads.join(', ')
                  : 'N/A'}
              </P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField>
              <H4>Languages (speak and understand)</H4>
              <P>
                {onboarding.canSpeaks.length > 0
                  ? onboarding.canSpeaks.join(', ')
                  : 'N/A'}
              </P>
            </Styles.SectionField>
          </Flex>
        </Styles.SectionBox>

        <Styles.SectionBox>
          <H2>Availability</H2>

          <Flex>
            <Styles.SectionField>
              <H4>How much time do you have to commit per month?</H4>
              <P>{onboarding.profile.hours_per_month} hours/month</P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField>
              <H4>What is the earliest you are available to volunteer?</H4>
              <P>
                {onboarding.profile.start_date
                  ? parseDate(new Date(onboarding.profile.start_date))
                  : 'N/A'}
              </P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField>
              <H4>
                Are there specific time periods you will not be available?
                (optional)
              </H4>
              <P>{onboarding.profile.availability_description || 'N/A'}</P>
            </Styles.SectionField>
          </Flex>
        </Styles.SectionBox>

        {/* attorney details for attorneys */}
        {onboarding.roles.includes('ATTORNEY') && (
          <Styles.SectionBox>
            <H2>Legal Experience</H2>

            <Flex>
              <Styles.SectionField>
                <H4>Which state are you barred in?</H4>
                <P>{onboarding.profile.state_barred || 'N/A'}</P>
              </Styles.SectionField>
            </Flex>
            <Flex>
              <Styles.SectionField>
                <H4>What is your attorney bar number?</H4>
                <P>{onboarding.profile.bar_number || 'N/A'}</P>
              </Styles.SectionField>
            </Flex>
            <Flex>
              <Styles.SectionField>
                <H4>
                  Are you registered by the Executive Office of Immigration
                  Review?
                </H4>
                <P>
                  {formatTruthy(
                    onboarding.profile.eoir_registered,
                    'Yes',
                    'No',
                    'N/A',
                  )}
                </P>
              </Styles.SectionField>
            </Flex>
          </Styles.SectionBox>
        )}

        {/* attorney details for legal fellows */}
        {onboarding.roles.includes('LEGAL_FELLOW') && (
          <Styles.SectionBox>
            <H2>Legal Experience</H2>

            <Flex>
              <Styles.SectionField>
                <H4>When do you expect to be barred?</H4>
                <P>
                  {onboarding.profile.expected_bar_date
                    ? parseDate(new Date(onboarding.profile.expected_bar_date))
                    : 'N/A'}
                </P>
              </Styles.SectionField>
            </Flex>
            <Flex>
              <Styles.SectionField>
                <H4>
                  Are you registered by the Executive Office of Immigration
                  Review?
                </H4>
                <P>
                  {formatTruthy(
                    onboarding.profile.eoir_registered,
                    'Yes',
                    'No',
                    'N/A',
                  )}
                </P>
              </Styles.SectionField>
            </Flex>
          </Styles.SectionBox>
        )}
      </Flex>

      <Flex $gap="40px">
        {onboarding.flow.length > 0 && (
          <BigLinkButton
            href={`/onboarding/${onboarding.flow[onboarding.progress - 1].url}`}
          >
            Back
          </BigLinkButton>
        )}
        <BigBlueButton>Submit</BigBlueButton>
      </Flex>
    </Styles.NormalFormDiv>
  );
}
