'use client';

import Image from 'next/image';
import Link from 'next/link';
import CONFIG from '@/lib/configs';
import { IconType } from '@/lib/icons';
import { Flex } from '@/styles/containers';
import { P } from '@/styles/text';
import FooterImage from '../../../public/images/footer-image.webp';
import Icon from '../Icon';
import * as Styles from './styles';

type SocialLink = {
  href: string;
  type: IconType;
};

const socialLinks: SocialLink[] = [
  { href: CONFIG.facebook, type: 'facebook' },
  { href: CONFIG.xTwitter, type: 'x' },
  { href: CONFIG.linkedin, type: 'linkedin' },
  { href: CONFIG.instagram, type: 'instagram' },
];

export default function Footer() {
  return (
    <Styles.Footer>
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
        <Styles.HorizontalLine $width="10rem" />
        <P $color="white">
          2727 Camino del Rio South, Suite 320
          <br />
          San Diego, CA 92108
        </P>
        <P $color="white">©2024 by ABA Immigration Justice Project</P>
        <Flex $direction="row" $gap="10px" $py="40px" $align="center">
          <Styles.FooterLink $color="white" href={CONFIG.blueprint}>
            Made By Cal Blueprint
          </Styles.FooterLink>
          <Icon type="blueprint" />
        </Flex>
      </Styles.FooterSection>

      <Flex $gap="50px">
        <Styles.FooterSection>
          <Styles.Header>Resources</Styles.Header>
          <Styles.HorizontalLine />
          <Styles.FooterLink $color="white" href={CONFIG.ABA}>
            ABA Website
          </Styles.FooterLink>
          <Styles.FooterLink $color="white" href={CONFIG.ABAComissions}>
            ABA Commission
            <br />
            on Immigration
          </Styles.FooterLink>
          <Styles.FooterLink $color="white" href={CONFIG.IJP}>
            ABA IJP Website
          </Styles.FooterLink>
        </Styles.FooterSection>
        <Styles.FooterSection>
          <Styles.Header>Contact Us</Styles.Header>
          <Styles.HorizontalLine />
          <P $color="white">Email: probono@abaijp.org</P>
          <P $color="white">Phone: 619-255-8829</P>
          <P $color="white">Office Phone: 619-255-8810</P>
          <Flex $gap="10px">
            {socialLinks.map(({ href, type }) => (
              <Link key={type} href={href}>
                <Icon type={type} />
              </Link>
            ))}
          </Flex>
        </Styles.FooterSection>
      </Flex>
    </Styles.Footer>
  );
}
