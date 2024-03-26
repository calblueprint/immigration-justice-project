'use client';

import { BigLinkButton } from '@/components/Buttons';
import COLORS from '@/styles/colors';
import { CenteringDiv, Flex, SmallCard } from '@/styles/containers';
import { H2Centered } from '@/styles/text';
import Link from 'next/link';
import CONFIG from '@/lib/configs';
import IJPLogo from '../../../public/images/ijp_logo_blue.webp';
import { LogoImage, OuterDiv } from '../onboarding/styles';

export default function Page() {
  return (
    <OuterDiv>
      <Link href={CONFIG.homepage}>
        <LogoImage $show width="205" alt="IJP Logo" src={IJPLogo} />
      </Link>
      <CenteringDiv>
        <Flex $direction="column" $gap="40px" $align="center">
          <SmallCard>
            <H2Centered>Sign Up Completed!</H2Centered>
            <BigLinkButton
              href="/cases"
              $primaryColor={COLORS.blueMid}
              $secondaryColor={COLORS.blueDark}
              $tertiaryColor={COLORS.blueDarker}
            >
              Browse Available Cases
            </BigLinkButton>
          </SmallCard>
        </Flex>
      </CenteringDiv>
    </OuterDiv>
  );
}
