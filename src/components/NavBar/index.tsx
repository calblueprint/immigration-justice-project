'use client';

import { useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileButton from '@/components/ProfileButton';
import COLORS from '@/styles/colors';
import { ProfileContext } from '@/utils/ProfileProvider';
import Icon from '../../../assets/icons/Icon';
import { LinkButton } from '../Buttons';
import {
  AuthButtons,
  LinkContainer,
  NavBarContainer,
  NavBarSectionDiv,
  NoUnderlineLink,
} from './style';

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
          href="/login"
        >
          Log In
        </LinkButton>
        <LinkButton
          $primaryColor={COLORS.goldMid}
          $secondaryColor={COLORS.blueMid}
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
      path: '/cases',
      active: IsActive('/cses'),
    },
    { name: 'Language Support', path: '/cases', active: IsActive('/cses') },
  ];

  const renderLink = (link: NavLinks) => (
    <LinkContainer active={link.active}>
      {/* Wrapper div for vertical centering */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <NoUnderlineLink href={link.path} $color="white">
          {link.name}
        </NoUnderlineLink>
      </div>
      <hr
        style={{
          display: 'block',
          width: '100%',
          height: '4px',
          backgroundColor: 'white',
          border: 'none',
          margin: 0, // Removing default margin from <hr>
        }}
      />
    </LinkContainer>
  );
  return (
    <NavBarContainer>
      <NavBarSectionDiv>
        <Link href="/">
          <Icon type="logo" />
        </Link>
        {navllink.map(NavLinks => renderLink(NavLinks))}
      </NavBarSectionDiv>
      <NavBarSectionDiv>
        <AuthButtons>{AuthButtonView}</AuthButtons>
      </NavBarSectionDiv>
    </NavBarContainer>
  );
}
