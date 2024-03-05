import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';

const ProfileButton = styled(Link)`
  ${sans.style}

  display: flex;
  align-items: center;
  gap: 0.75rem;

  outline: none;
  background: none;
  border: none;

  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &::before {
    content: '';
    display: block;
    width: 1.5625rem;
    height: 1.75rem;
    background-image: url('data:image/svg+xml,%3csvg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cg clip-path="url(%23clip0_1777_5565)"%3e%3cpath d="M16.9643 7C16.9643 5.83968 16.4939 4.72688 15.6567 3.90641C14.8195 3.08594 13.684 2.625 12.5 2.625C11.316 2.625 10.1805 3.08594 9.34327 3.90641C8.50606 4.72688 8.03571 5.83968 8.03571 7C8.03571 8.16032 8.50606 9.27312 9.34327 10.0936C10.1805 10.9141 11.316 11.375 12.5 11.375C13.684 11.375 14.8195 10.9141 15.6567 10.0936C16.4939 9.27312 16.9643 8.16032 16.9643 7ZM5.35714 7C5.35714 5.14348 6.10969 3.36301 7.44924 2.05025C8.78878 0.737498 10.6056 0 12.5 0C14.3944 0 16.2112 0.737498 17.5508 2.05025C18.8903 3.36301 19.6429 5.14348 19.6429 7C19.6429 8.85652 18.8903 10.637 17.5508 11.9497C16.2112 13.2625 14.3944 14 12.5 14C10.6056 14 8.78878 13.2625 7.44924 11.9497C6.10969 10.637 5.35714 8.85652 5.35714 7ZM2.75112 25.375H22.2489C21.7522 21.9133 18.7165 19.25 15.0502 19.25H9.94978C6.28348 19.25 3.24777 21.9133 2.75112 25.375ZM0 26.3758C0 20.9891 4.45312 16.625 9.94978 16.625H15.0502C20.5469 16.625 25 20.9891 25 26.3758C25 27.2727 24.2578 28 23.3426 28H1.65737C0.742188 28 0 27.2727 0 26.3758Z" fill="black"/%3e%3c/g%3e%3cdefs%3e%3cclipPath id="clip0_1777_5565"%3e%3crect width="25" height="28" fill="white"/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e');
    background-position: center;
    background-size: 1.5625rem 1.75rem;
    background-repeat: no-repeat;
  }
`;

export default ProfileButton;
