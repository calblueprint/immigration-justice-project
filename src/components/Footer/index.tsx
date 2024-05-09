'use client';

import Image from 'next/image';
import Link from 'next/link';
import { P } from '@/styles/text';
import { IconType } from '@/lib/icons';
import { Flex } from '@/styles/containers';
import FooterImage from '../../../public/images/footer-image.webp';
import * as Styles from './styles';
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
    <Styles.FooterContainer>
      <Styles.FooterDiv>
        <Styles.FooterSection>
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
          <P $color="white">
            2727 Camino del Rio South, Suite 320 San Diego, CA 92108
          </P>
          <P $color="white">©2024 by ABA Immigration Justice Project</P>
          <Flex
            $direction="row"
            $gap="10px"
            $py="40px"
            $px="0px"
            $align="center"
          >
            <Styles.FooterLink
              $color="white"
              href="https://calblueprint.org/"
              style={{ fontSize: '0.938rem' }}
            >
              Made By Cal BluePrint
            </Styles.FooterLink>
            <Icon type="blueprint" />
          </Flex>
        </Styles.FooterSection>
      </Styles.FooterDiv>
      <Styles.FooterDiv>
        <Styles.FooterSection>
          <Styles.Header>Resources</Styles.Header>
          <hr style={{ width: '40px' }} />
          <Styles.FooterLink $color="white" href="https://www.americanbar.org/">
            ABA Website
          </Styles.FooterLink>
          <Styles.FooterLink
            $color="white"
            href="https://www.americanbar.org/groups/public_interest/immigration/"
          >
            ABA Commission on Immigration
          </Styles.FooterLink>
          <Styles.FooterLink
            $color="white"
            href="https://www.americanbar.org/groups/public_interest/immigration/projects_initiatives/immigration-justice-project/"
          >
            ABA IJP Website
          </Styles.FooterLink>
          <P $color="white">Hotline: 619-641-7510</P>
        </Styles.FooterSection>
        <Styles.FooterSection>
          <Styles.Header>Contact Us</Styles.Header>
          <hr style={{ width: '2.5rem' }} />
          <P $color="white">Email: probono@abaijp.org</P>
          <P $color="white">Phone: 619-255-8829</P>
          <Styles.IconDiv>
            {socialLinks.map(({ href, type }) => (
              <Link key={type} href={href}>
                <Icon type={type} />
              </Link>
            ))}
          </Styles.IconDiv>
        </Styles.FooterSection>
      </Styles.FooterDiv>
    </Styles.FooterContainer>
  );
}
