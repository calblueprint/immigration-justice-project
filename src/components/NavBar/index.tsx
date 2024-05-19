'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import IJPlogo from '~/public/images/ijp-logo.webp';
import { ProfileButton, SmallLinkButton } from '../Buttons';
import * as Styles from './style';

export default function NavBar() {
  const profile = useProfile();
  if (!profile) throw new Error('Profile must be defined.');

  const auth = useAuth();
  if (!auth) throw new Error('Auth Must be defined.');

  const AuthButtonView = useMemo(() => {
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
          href="/login"
        >
          Log In
        </SmallLinkButton>
        <SmallLinkButton
          $primaryColor="white"
          $secondaryColor={COLORS.blueDark}
          href="/signup"
          style={{ color: COLORS.blueMid }}
        >
          Sign Up
        </SmallLinkButton>
      </>
    );
  }, [profile]);

  function useActiveStatus(path: string): boolean {
    const currentPath = usePathname();
    return currentPath.includes(path);
  }

  type NavLink = {
    name: string;
    path: string;
    active: boolean;
  };
  const navlinks: NavLink[] = [
    { name: 'Cases', path: '/cases', active: useActiveStatus('/cases') },
    {
      name: 'Limited Case Assignments',
      path: '/limited-case-assignments',
      active: useActiveStatus('/limited-case-assignments'),
    },
    {
      name: 'Language Support',
      path: '/language-support',
      active: useActiveStatus('/language-support'),
    },
  ];

  const renderLink = (link: NavLink) => (
    <Styles.LinkContainer key={link.path}>
      <Flex
        $direction="column"
        $justify="center"
        style={{
          flex: 1,
        }}
      >
        <Styles.NoUnderlineLink
          href={link.path}
          $color="white"
          $isActive={link.active}
        >
          <Styles.DisplayText $isActive={link.active}>
            {link.name}
          </Styles.DisplayText>
          {link.name}
        </Styles.NoUnderlineLink>
      </Flex>
      <Styles.ActiveUnderline $isActive={link.active} />
    </Styles.LinkContainer>
  );

  const currentPath = usePathname();
  if (currentPath.includes('/onboarding') && !currentPath.includes('/roles')) {
    return null;
  }

  return (
    <Styles.NavBarContainer>
      <Styles.NavBarSectionDiv>
        <Link href="/">
          <Image
            alt="background"
            src={IJPlogo.src}
            placeholder="blur"
            blurDataURL={IJPlogo.src}
            quality={100}
            width={47}
            height={47}
          />
        </Link>
        {navlinks.map(renderLink)}
      </Styles.NavBarSectionDiv>
      <Styles.NavBarSectionDiv>
        <Styles.AuthButtons>{AuthButtonView}</Styles.AuthButtons>
      </Styles.NavBarSectionDiv>
    </Styles.NavBarContainer>
  );
}
