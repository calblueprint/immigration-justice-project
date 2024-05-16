'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileButton from '@/components/ProfileButton';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { useProfile } from '@/utils/ProfileProvider';
import Icon from '../../../assets/icons/Icon';
import { SmallLinkButton } from '../Buttons';
import * as Styles from './style';

export default function NavBar() {
  const profile = useProfile();
  const AuthButtonView = useMemo(() => {
    if (!profile) throw new Error('Profile must be defined.');
    if (profile.profileReady && profile?.profileData)
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
    <Styles.LinkContainer>
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
          isactive={link.active}
        >
          {link.name}
        </Styles.NoUnderlineLink>
      </Flex>
      <Styles.ActiveUnderline $isActive={link.active} />
    </Styles.LinkContainer>
  );

  const currentPath = usePathname();
  if (currentPath.includes('/onboarding')) {
    return null;
  }

  return (
    <Styles.NavBarContainer>
      <Styles.NavBarSectionDiv>
        <Link href="/">
          <Icon type="logo" />
        </Link>
        {navlinks.map(NavLink => renderLink(NavLink))}
      </Styles.NavBarSectionDiv>
      <Styles.NavBarSectionDiv>
        <Styles.AuthButtons>{AuthButtonView}</Styles.AuthButtons>
      </Styles.NavBarSectionDiv>
    </Styles.NavBarContainer>
  );
}
