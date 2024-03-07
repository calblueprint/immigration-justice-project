'use client';

import { useContext, useMemo } from 'react';
import Link from 'next/link';
import ProfileButton from '@/components/ProfileButton';
import COLORS from '@/styles/colors';
import { ProfileContext } from '@/utils/ProfileProvider';
import Icon from '../../../assets/icons/Icon';
import { LinkButton } from '../Buttons';
import {
  AuthButtons,
  CustomDiv,
  IconLink,
  NavBarContainer,
  NavBarDiv,
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

  return (
    <NavBarContainer>
      <NavBarDiv>
        <CustomDiv>
          <Link href="/">
            <IconLink>
              <Icon type="logo" />
            </IconLink>
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
        </CustomDiv>
        <CustomDiv>
          <AuthButtons>{AuthButtonView}</AuthButtons>
        </CustomDiv>
      </NavBarDiv>
    </NavBarContainer>
  );
}
