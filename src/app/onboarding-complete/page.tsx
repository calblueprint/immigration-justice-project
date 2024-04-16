'use client';

import Link from 'next/link';
import { LogoImage, OuterDiv } from '@/app/onboarding/styles';
import { BigLinkButton } from '@/components/Buttons';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { CenteringDiv, Flex, SmallCard } from '@/styles/containers';
import { H2Centered, P } from '@/styles/text';
import IJPLogo from '~/public/images/ijp_logo_blue.webp';

export default function Page() {
  return (
    <OuterDiv>
      <Link href={CONFIG.homepage}>
        <LogoImage $show width="205" alt="IJP Logo" src={IJPLogo} />
      </Link>
      <CenteringDiv>
        <Flex $direction="column" $gap="40px" $align="center">
          <SmallCard>
            <Flex $direction="column" $justify="center" $gap="40px" $px="40px">
              <H2Centered>You&apos;re all set!</H2Centered>
              <P $align="center">
                You can now submit interest applications for the available
                listings.
              </P>
              <BigLinkButton
                href={CONFIG.homepage}
                $primaryColor={COLORS.blueMid}
                $secondaryColor={COLORS.blueDark}
                $tertiaryColor={COLORS.blueDarker}
              >
                Back to Home
              </BigLinkButton>
            </Flex>
          </SmallCard>
        </Flex>
      </CenteringDiv>
    </OuterDiv>
  );
}
