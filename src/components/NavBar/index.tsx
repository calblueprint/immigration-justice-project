'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import ijpLogo from '~/public/images/ijp-logo-small.webp';
import { ProfileButton, SmallLinkButton } from '../Buttons';
import * as Styles from './style';

type NavLink = {
  name: string;
  path: string;
};

const navlinks: NavLink[] = [
  { name: 'Cases', path: CONFIG.cases },
  {
    name: 'Limited Case Assignments',
    path: CONFIG.lca,
  },
  {
    name: 'Language Support',
    path: CONFIG.languageSupport,
  },
];

export default function NavBar() {
  const profile = useProfile();
  if (!profile) throw new Error('Profile must be defined.');

  const currentPath = usePathname();

  const auth = useAuth();
  if (!auth) throw new Error('Auth must be defined.');

  const authButtonView = useMemo(() => {
    if (profile.profileReady && auth.userId)
      return (
        <ProfileButton href="/settings">
          {profile.profileData?.first_name || 'Profile'}
        </ProfileButton>
      );

    return (
      <>
        <SmallLinkButton
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          href={CONFIG.login}
        >
          Log In
        </SmallLinkButton>
        <SmallLinkButton
          $primaryColor="white"
          $secondaryColor={COLORS.blueDark}
          href={CONFIG.signup}
          style={{ color: COLORS.blueMid }}
        >
          Sign Up
        </SmallLinkButton>
      </>
    );
  }, [profile, auth.userId]);

  const renderLink = (link: NavLink) => (
    <Styles.LinkContainer key={link.path}>
      <Flex
        $direction="column"
        $justify="center"
        style={{
          flex: 1,
        }}
      >
        <Styles.NoUnderlineLink href={link.path} $color="white">
          <Styles.DisplayText $isActive={currentPath === link.path}>
            {link.name}
          </Styles.DisplayText>
          {link.name}
        </Styles.NoUnderlineLink>
      </Flex>
      <Styles.ActiveUnderline $isActive={currentPath === link.path} />
    </Styles.LinkContainer>
  );

  if (currentPath.includes('/onboarding') && !currentPath.includes('/roles')) {
    return null;
  }

  return (
    <Styles.NavBarContainer>
      <Styles.NavBarSectionDiv>
        <Link href="/">
          <Image
            alt="logo"
            src={ijpLogo}
            style={{ width: '47px', height: '47px' }}
          />
        </Link>
        {navlinks.map(renderLink)}
      </Styles.NavBarSectionDiv>
      <Styles.NavBarSectionDiv>
        <Styles.AuthButtons>{authButtonView}</Styles.AuthButtons>
      </Styles.NavBarSectionDiv>
    </Styles.NavBarContainer>
  );
}
