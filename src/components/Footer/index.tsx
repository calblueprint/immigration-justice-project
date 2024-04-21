'use client';

import Image from 'next/image';
import Link from 'next/link';
import { P, H3 } from '@/styles/text';
import {
  FooterContainer,
  FooterSection,
  FooterDiv,
  IconDiv,
  FooterLink,
} from './styles';
import Icon from '../Icon';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterDiv>
        <FooterSection>
          <Image
            alt="footer image"
            src="/footerimage.webp"
            placeholder="blur"
            blurDataURL="/footerimage.webp"
            quality={100}
            width={168}
            height={66}
          />
          <hr style={{ width: '160px' }} />
          <P $color="white">2727 Camino del Rio S</P>
          <P $color="white">©2024 by Immigration Justice Project Pro Bono</P>
        </FooterSection>
      </FooterDiv>
      <FooterDiv>
        <FooterSection>
          <H3 $color="white" style={{ fontSize: '1.25rem' }}>
            Resources
          </H3>
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
          <H3 $color="white" style={{ fontSize: '1.25rem' }}>
            Contact Us
          </H3>
          <hr style={{ width: '2.5rem' }} />
          <P $color="white">Email: probono@abaijp.org</P>
          <P $color="white">Phone: 619-255-8829</P>
          <IconDiv>
            <Link href="https://www.facebook.com/ImmigrationJusticeProjectOfSanDiego/">
              <Icon type="facebook" />
            </Link>
            <Link href="https://twitter.com/ijpsandiego?lang=en">
              <Icon type="x" />
            </Link>
            <Link href="https://www.linkedin.com/company/immigration-justice-project/">
              <Icon type="linkedin" />
            </Link>
            <Link href="https://www.instagram.com/ijp.sandiego/">
              <Icon type="instagram" />
            </Link>
          </IconDiv>
        </FooterSection>
      </FooterDiv>
    </FooterContainer>
  );
}
