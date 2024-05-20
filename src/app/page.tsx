'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { LinkButton } from '@/components/Buttons';
import Footer from '@/components/Footer';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Box } from '@/styles/containers';
import { H2, H3, H4 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import graphicAssignment from '~/public/graphics/assignment.svg';
import graphicCase from '~/public/graphics/briefcase.svg';
import graphicLanguageSupport from '~/public/graphics/interpretation.svg';
import heroImage from '~/public/images/hero.webp';
import secondImage from '~/public/images/homepage-second-image.webp';
import * as Styles from './styles';

interface Stat {
  number: string;
  label: string;
}

interface Service {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: React.ReactNode;
}

const stats: Stat[] = [
  { number: '180+', label: 'Pro Bono Cases' },
  { number: '200+', label: 'Attorney Volunteers' },
  { number: '65+', label: 'Interpreters and Translators' },
  { number: '50+', label: 'Successful Outcomes' },
];

const services: Service[] = [
  {
    iconSrc: graphicCase,
    iconAlt: 'gavel and briefcase',
    title: 'Case Assistance',
    description: (
      <>
        <b>Attorneys</b> in any state with or without immigration law experience
        can represent immigrants and asylum-seekers in removal proceeding before
        the Immigration Court, the Board of Immigration Appeals and the U.S.
        Court of Appeals for the Ninth Circuit.
      </>
    ),
  },
  {
    iconSrc: graphicAssignment,
    iconAlt: 'letter from an envelope',
    title: 'Limited Case Assignment',
    description: (
      <>
        <b>Law students, recent graduates, and attorneys</b> awaiting bar
        results can assist attorneys to screen potential clients, conduct legal
        and factual research and write motions and briefs in support of on-going
        court cases.
      </>
    ),
  },
  {
    iconSrc: graphicLanguageSupport,
    iconAlt: 'people in conversation',
    title: 'Language Support',
    description: (
      <>
        <b>Interpreters</b> and <b>translators</b> can conduct volunteer
        translation and live interpertation. We have frequent need for
        individuals who speak Creole, Portuguese, Spanish, French, Arabic, and
        Russian
      </>
    ),
  },
];

export default function Home() {
  const auth = useAuth();
  const profile = useProfile();

  const volunteerLink = useMemo(() => {
    if (!auth) throw new Error('Auth must be defined.');
    if (!profile) throw new Error('Profile must be defined.');
    if (!auth.userId) return profile.profileReady ? '/login' : '';
    if (profile.profileReady && !profile.profileData)
      return CONFIG.onboardingHome;
    if (profile.roles.map(r => r.role).includes('ATTORNEY'))
      return CONFIG.cases;
    if (profile.roles.map(r => r.role).includes('LEGAL_FELLOW'))
      return CONFIG.lca;
    return CONFIG.languageSupport;
  }, [auth, profile]);

  return (
    <Styles.PageContainer>
      <Styles.TitleSection>
        <Styles.ImageContainer>
          <Image
            alt="background"
            src={heroImage.src}
            placeholder="blur"
            blurDataURL={heroImage.src}
            quality={100}
            style={{ objectFit: 'cover' }}
            fill
          />
          <Styles.ImageBackground />
        </Styles.ImageContainer>
        <Styles.TextContainer>
          <Styles.Title>IMMIGRATION JUSTICE PROJECT</Styles.Title>
          <Styles.Subtitle>
            The Immigration Justice Project (IJP) seeks to promote due process
            and access to justice through the provision of high quality legal
            services on behalf of indigent immigrants and asylum seekers.
          </Styles.Subtitle>
          <div>
            <LinkButton
              $primaryColor={COLORS.goldMid}
              $secondaryColor={COLORS.goldDark}
              href={volunteerLink}
              style={{ fontSize: '1.5rem' }}
            >
              Volunteer Now
            </LinkButton>
          </div>
        </Styles.TextContainer>
      </Styles.TitleSection>
      <Styles.StatisticsSection>
        <Styles.StatInnerContainer>
          {stats.map(stat => (
            <Styles.StatContainer key={stat.label}>
              <H2 $color={COLORS.blueDark}>{stat.number}</H2>
              <Styles.StatLabel>{stat.label}</Styles.StatLabel>
            </Styles.StatContainer>
          ))}
        </Styles.StatInnerContainer>
      </Styles.StatisticsSection>
      <Styles.HowYouCanHelpContainer style={{ background: COLORS.background }}>
        <H2 $color={COLORS.blueMid} $fontWeight={400}>
          HOW <strong style={{ color: COLORS.goldMid }}>YOU</strong> CAN HELP
        </H2>
        <Styles.ServicesDiv>
          {services.map(service => (
            <Styles.ServiceContainer key={service.title}>
              <Styles.ServiceIcon src={service.iconSrc} alt={service.iconAlt} />
              <H3 $color={COLORS.blueMid}>{service.title}</H3>
              <H4 $color={COLORS.greyDark} $fontWeight="400">
                {service.description}
              </H4>
            </Styles.ServiceContainer>
          ))}
        </Styles.ServicesDiv>
      </Styles.HowYouCanHelpContainer>
      <Styles.MissionValuesContainer>
        <Styles.MissionStatement>
          <H2 $color={COLORS.blueMid}>OUR MISSION VALUES</H2>
          <H4 $fontWeight="400">
            The mission of the Immigration Justice Project (IJP) is to improve
            public awareness of the legal system, to promote the administration
            of justice, and to deliver high-quality legal services. IJP’s goals
            are specifically targeted toward promoting due process and access to
            justice at all levels of the immigration and appellate court systems
            through the provision of high-quality legal services to individuals
            navigating immigration legal proceedings in the San Diego,
            California border region.
          </H4>
          <Box $mt="0.8rem" $h="max-content">
            <LinkButton
              $primaryColor={COLORS.goldMid}
              $secondaryColor={COLORS.goldDark}
              href="https://www.americanbar.org/groups/public_interest/immigration/"
            >
              Learn More
            </LinkButton>
          </Box>
        </Styles.MissionStatement>
        <Styles.ImageWrapper>
          <Image
            alt="Lawyer Image"
            src={secondImage}
            placeholder="blur"
            blurDataURL={secondImage.src}
            quality={100}
            style={{ objectFit: 'cover' }}
            sizes="100%"
            fill
          />
        </Styles.ImageWrapper>
      </Styles.MissionValuesContainer>
      <Footer />
    </Styles.PageContainer>
  );
}
