'use client';

import Link from 'next/link';
import { useMemo, useContext } from 'react';
import COLORS from '@/styles/colors';
import { ProfileContext } from '@/utils/ProfileProvider';
import ProfileButton from '@/components/ProfileButton';
import { LinkButton } from '@/components/Button';
import {
  NavBarContainer,
  NavBarSectionDiv,
  AuthButtons,
  NoUnderlineLink,
} from './style';
import Icon from '../../../assets/icons/Icon';

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

  return (
    <NavBarContainer>
        <NavBarSectionDiv>
          <Link href="/">
            <Icon type="logo" />
          </Link>
          <NoUnderlineLink href="/cases" $color="white">
            Cases
          </NoUnderlineLink>

          <NoUnderlineLink href="/cases" $color="white">
            Limited Case Assignments
          </NoUnderlineLink>
          <NoUnderlineLink href="/cases" $color="white">
            Language Support
          </NoUnderlineLink>
        </NavBarSectionDiv>
        <NavBarSectionDiv>
          <AuthButtons>{AuthButtonView}</AuthButtons>
        </NavBarSectionDiv>
    </NavBarContainer>
  );
}
