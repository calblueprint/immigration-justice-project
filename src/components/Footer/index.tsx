'use client';

import Image from 'next/image';
import Link from 'next/link';
import { P, H3 } from '@/styles/text';
import { IconType } from '@/lib/icons';
import { Flex } from '@/styles/containers';
import FooterImage from '../../../public/images/footer-image.webp';
import {
  FooterContainer,
  FooterSection,
  FooterDiv,
  IconDiv,
  FooterLink,
} from './styles';
import Icon from '../Icon';

type SocialLink = {
  href: string;
  type: IconType;
};

const socialLinks: SocialLink[] = [
  {
    href: 'https://www.facebook.com/ImmigrationJusticeProjectOfSanDiego/',
    type: 'facebook',
  },
  { href: 'https://twitter.com/ijpsandiego?lang=en', type: 'x' },
  {
    href: 'https://www.linkedin.com/company/immigration-justice-project/',
    type: 'linkedin',
  },
  { href: 'https://www.instagram.com/ijp.sandiego/', type: 'instagram' },
];

export default function Footer() {
  return (
    <FooterContainer>
      <FooterDiv>
        <FooterSection>
          <Image
            alt="footer image"
            src={FooterImage.src}
            placeholder="blur"
            blurDataURL={FooterImage.src}
            quality={100}
            width={168}
            height={66}
          />
          <hr style={{ width: '160px' }} />
          <P $color="white">2727 Camino del Rio S</P>
          <P $color="white">©2024 by Immigration Justice Project Pro Bono</P>
          <Flex
            $direction="row"
            $gap="10px"
            $py="40px"
            $px="0px"
            $align="center"
          >
            <FooterLink
              $color="white"
              href="https://calblueprint.org/"
              style={{ fontSize: '0.9rem' }}
            >
              Made By Cal BluePrint
            </FooterLink>
            <Icon type="blueprint" />
          </Flex>
        </FooterSection>
      </FooterDiv>
      <FooterDiv>
        <FooterSection>
          <H3 $color="white">Resources</H3>
          <hr style={{ width: '40px' }} />
          <FooterLink $color="white" href="https://www.americanbar.org/">
            ABA Website
          </FooterLink>
          <FooterLink
            $color="white"
            href="https://www.americanbar.org/groups/public_interest/immigration/"
          >
            IJP Commission
          </FooterLink>
          <P $color="white">Hotline: 619-641-7510</P>
        </FooterSection>
        <FooterSection>
          <H3 $color="white">Contact Us</H3>
          <hr style={{ width: '2.5rem' }} />
          <P $color="white">Email: probono@abaijp.org</P>
          <P $color="white">Phone: 619-255-8829</P>
          <IconDiv>
            {socialLinks.map(({ href, type }) => (
              <Link key={type} href={href}>
                <Icon type={type} />
              </Link>
            ))}
          </IconDiv>
        </FooterSection>
      </FooterDiv>
    </FooterContainer>
  );
}
