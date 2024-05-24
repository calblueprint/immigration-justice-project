'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigBlueAsyncButton, BigLinkButton } from '@/components/Buttons';
import { EditLinkButton } from '@/components/EditButton';
import Icon from '@/components/Icon';
import COLORS from '@/styles/colors';
import { Card, Flex } from '@/styles/containers';
import { H1Centered, H2, H4, P } from '@/styles/text';
import { formatTruthy, parseDate } from '@/utils/helpers';
import {
  useGuardedOnboarding,
  useOnboardingNavigation,
  useScrollToTop,
} from '@/utils/hooks';
import * as Styles from '../styles';

export default function Page() {
  const onboarding = useGuardedOnboarding();
  const [errorMessage, setErrorMessage] = useState('');
  const { flowAt, backlinkHref } = useOnboardingNavigation();
  const { push } = useRouter();

  // scroll to top
  useScrollToTop();

  // triggers on clicking submit
  const onSubmit = async () => {
    try {
      await onboarding.flushData();
      await push('/onboarding-complete');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setErrorMessage(msg);
    }
  };

  return (
    <Card>
      <Flex $direction="column" $gap="30px">
        <Styles.BackLink href={backlinkHref}>
          <Icon type="leftArrow" />
        </Styles.BackLink>

        <H1Centered>Review & Submit</H1Centered>

        {errorMessage && <P $color={COLORS.redMid}>* {errorMessage}</P>}

        {/* basic information section */}
        <Styles.SectionBox>
          <Flex $justify="between" $align="center">
            <H2>Basic Information</H2>
            <EditLinkButton href={flowAt(1)} />
          </Flex>
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
              <H4>Country</H4>
              <P>{onboarding.profile.country ?? 'N/A'}</P>
            </Styles.SectionField>
            <Styles.SectionField>
              <H4>State</H4>
              <P>{onboarding.profile.state ?? 'N/A'}</P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField>
              <H4>City</H4>
              <P>{onboarding.profile.city ?? 'N/A'}</P>
            </Styles.SectionField>
            <Styles.SectionField>
              <H4>Phone Number</H4>
              <P>{onboarding.profile.phone_number}</P>
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

        {/* availability section */}
        <Styles.SectionBox>
          <Flex $justify="between" $align="center">
            <H2>Availability</H2>
            <EditLinkButton href={flowAt(2)} />
          </Flex>
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
                  ? parseDate(onboarding.profile.start_date)
                  : 'N/A'}
              </P>
            </Styles.SectionField>
          </Flex>
          <Flex>
            <Styles.SectionField $optional>
              <H4>
                Are there specific time periods you will not be available?
                (optional)
              </H4>
              <P>{onboarding.profile.availability_description || 'N/A'}</P>
            </Styles.SectionField>
          </Flex>
        </Styles.SectionBox>

        {/* legal information for attorneys */}
        {onboarding.roles.includes('ATTORNEY') && (
          <Styles.SectionBox>
            <Flex $justify="between" $align="center">
              <H2>Legal Experience</H2>
              <EditLinkButton href={flowAt(3)} />
            </Flex>
            <Flex>
              <Styles.SectionField>
                <H4>Which state are you barred in?</H4>
                <P>{onboarding.profile.state_barred || 'N/A'}</P>
              </Styles.SectionField>
            </Flex>
            <Flex>
              <Styles.SectionField>
                <H4>Do you have a bar number in this state?</H4>
                <P>{onboarding.profile.has_bar_number ? 'Yes' : 'No'}</P>
              </Styles.SectionField>
            </Flex>
            {onboarding.profile.has_bar_number && (
              <Flex>
                <Styles.SectionField>
                  <H4>What is your attorney bar number?</H4>
                  <P>{onboarding.profile.bar_number || 'N/A'}</P>
                </Styles.SectionField>
              </Flex>
            )}
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
            <Flex>
              <Styles.SectionField>
                <H4>Is there anything about your bar status we should know?</H4>
                <P>{onboarding.profile.legal_credential_comment ?? 'N/A'}</P>
              </Styles.SectionField>
            </Flex>
          </Styles.SectionBox>
        )}

        {/* legal experience for legal fellows */}
        {onboarding.roles.includes('LEGAL_FELLOW') && (
          <Styles.SectionBox>
            <Flex $justify="between" $align="center">
              <H2>Legal Experience</H2>
              <EditLinkButton href={flowAt(3)} />
            </Flex>
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

      {errorMessage && <P $color={COLORS.redMid}>* {errorMessage}</P>}

      <Flex $gap="40px">
        <BigLinkButton href={backlinkHref}>Back</BigLinkButton>
        <BigBlueAsyncButton onClick={onSubmit}>Submit</BigBlueAsyncButton>
      </Flex>
    </Card>
  );
}
