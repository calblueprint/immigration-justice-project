'use client';

import { useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileButton from '@/components/ProfileButton';
import { LinkButton } from '@/components/SmallerButton';
import COLORS from '@/styles/colors';
import { ProfileContext } from '@/utils/ProfileProvider';
import Icon from '../../../assets/icons/Icon';
import * as Styles from './style';

export default function NavBar() {
  const profile = useContext(ProfileContext);
  const AuthButtonView = useMemo(() => {
    if (profile?.profileReady)
      return (
        <ProfileButton href="/settings">
          {profile.profileData?.first_name || 'Profile'}
        </ProfileButton>
      );

    return (
      <>
        <LinkButton
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          $fontColor="white"
          href="/login"
        >
          Log In
        </LinkButton>
        <LinkButton
          $primaryColor="white"
          $secondaryColor={COLORS.blueDark}
          $fontColor={COLORS.blueMid}
          href="/signup"
        >
          Sign Up
        </LinkButton>
      </>
    );
  }, [profile]);

  function IsActive(path: string): boolean {
    const currentPath = usePathname();
    return currentPath.includes(path);
  }

  type NavLinks = {
    name: string;
    path: string;
    active: boolean;
  };
  const navllink: NavLinks[] = [
    { name: 'Cases', path: '/cases', active: IsActive('/cases') },
    {
      name: 'Limited Case Assignments',
      path: '/limited-case-assignments',
      active: IsActive('/limited-case-assignments'),
    },
    {
      name: 'Language Support',
      path: '/language-support',
      active: IsActive('/language-support'),
    },
  ];

  const renderLink = (link: NavLinks) => (
    <Styles.LinkContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
      </div>

      {link.active && (
        <hr
          style={{
            display: 'block',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '4px',
            backgroundColor: 'white',
            border: 'none',
            margin: 0,
            marginBottom: '4px',
          }}
        />
      )}
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
        {navllink.map(NavLinks => renderLink(NavLinks))}
      </Styles.NavBarSectionDiv>
      <Styles.NavBarSectionDiv>
        <Styles.AuthButtons>{AuthButtonView}</Styles.AuthButtons>
      </Styles.NavBarSectionDiv>
    </Styles.NavBarContainer>
  );
}
