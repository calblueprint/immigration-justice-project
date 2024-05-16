import Link from 'next/link';
import styled from 'styled-components';
import { sans } from '@/styles/fonts';

const ProfileButton = styled(Link)`
  ${sans.style}

  display: flex;
  align-items: center;
  gap: 0.75rem;

  outline: none;
  background: none;
  border: none;

  color: white;
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
    background-image: url("data:image/svg+xml,%3Csvg width='17' height='20' viewBox='0 0 18 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.19565 10.5557C10.5135 10.5557 11.7774 10.0289 12.7092 9.0912C13.6411 8.15352 14.1646 6.88175 14.1646 5.55566C14.1646 4.22958 13.6411 2.95781 12.7092 2.02013C11.7774 1.08245 10.5135 0.555664 9.19565 0.555664C7.87781 0.555664 6.61394 1.08245 5.68208 2.02013C4.75022 2.95781 4.22671 4.22958 4.22671 5.55566C4.22671 6.88175 4.75022 8.15352 5.68208 9.0912C6.61394 10.0289 7.87781 10.5557 9.19565 10.5557ZM7.42158 12.4307C3.59783 12.4307 0.5 15.5479 0.5 19.3955C0.5 20.0361 1.0163 20.5557 1.65295 20.5557H16.7384C17.375 20.5557 17.8913 20.0361 17.8913 19.3955C17.8913 15.5479 14.7935 12.4307 10.9697 12.4307H7.42158Z' fill='white'/%3E%3C/svg%3E");
    background-position: center;
    background-size: 1.5625rem 1.75rem;
    background-repeat: no-repeat;
  }
`;

export default ProfileButton;
