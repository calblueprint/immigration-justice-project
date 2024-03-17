'use client';

import COLORS from '@/styles/colors';
import Image from 'next/image';
import { H2, H3, H4 } from '../styles/text';
import { LinkButton } from '../components/Button';

import {
  TitleSection,
  PageContainer,
  ButtonDiv,
  StatisticsSection,
  StatLabel,
  StatContainer,
  HowYouCanHelpContainer,
  Title,
  ServiceContainer,
  ServiceIcon,
  ServicesDiv,
  MissionValuesContainer,
  MissionStatement,
  TextContainer,
  ImageBackground,
  ImageContainer,
  ImageWrapper,
} from './styles';

type Stat = {
  number: string;
  label: string;
};

const stats: Stat[] = [
  { number: '100+', label: 'Matched Cases' },
  { number: '50+', label: 'Attorneys' },
  { number: '100+', label: 'Translation Support' },
  { number: '100+', label: 'Successful Outcomes' },
];

const renderStat = (stat: Stat) => (
  <StatContainer key={stat.label}>
    <H2 $color={COLORS.blueDark}>{stat.number}</H2>
    <StatLabel>{stat.label}</StatLabel>
  </StatContainer>
);
type Service = {
  iconSrc: string;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    iconSrc: 'An Icon will be Here',
    title: 'Case Assistance',
    description:
      'Attorneys licensed in any state with or without immigration law experience can represent immigrants and asylum-seekers in removal proceeding before the Immigration Court, the Board of Immigration Appeals and the U.S. Court of Appeals for the Ninth Circuit.',
  },
  {
    iconSrc: 'An Icon will be Here',
    title: 'Limited Case Assistance',
    description:
      'Law students and recent graduates awaiting bar results can assist attorneys to screen potential clients, conduct legal and factual research and write motions and briefs in support of on-going court cases.',
  },
  {
    iconSrc: 'An Icon will be Here',
    title: 'Translation Assignment',
    description:
      'Interpreters and translators can conduct volunteer translation and live interpertation. We have frequent need for individuals who speak Creole, Portuguese, Spanish, French, Arabic, and Russian',
  },
];

const renderService = (service: Service) => (
  <ServiceContainer key={service.title}>
    <ServiceIcon src={service.iconSrc} alt={service.title} />
    <H3 $color={COLORS.blueMid}>{service.title}</H3>
    <H4 $color={COLORS.greyDark} $fontWeight="400">
      {service.description}
    </H4>
  </ServiceContainer>
);

export default function Home() {
  return (
    <PageContainer>
      <TitleSection>
        <ImageContainer>
          <Image
            alt="background"
            src="/HomePageImage.webp"
            placeholder="blur"
            blurDataURL="/HomePageImage.webp"
            quality={100}
            layout="fill"
            objectFit="cover"
            fill
          />
          <ImageBackground />
        </ImageContainer>
        <TextContainer>
          <Title>IMMIGRATION JUSTICE PROJECT</Title>
          <H3 $color="white" $fontWeight="400">
            The Immigration Justice Project (IJP) seeks to promote due process
            and access to justice through the provision of high quality legal
            services on behalf of indigent immigrants and asylum seekers.
          </H3>
          <ButtonDiv>
            <LinkButton
              $primaryColor={COLORS.goldMid}
              $secondaryColor={COLORS.blueDarker}
              href="../signup"
            >
              Learn More
            </LinkButton>
          </ButtonDiv>
        </TextContainer>
      </TitleSection>
      <StatisticsSection>
        {stats.map(stat => renderStat(stat))}
      </StatisticsSection>
      <HowYouCanHelpContainer>
        <H2 $color={COLORS.blueMid}>HOW YOU CAN HELP</H2>
        <ServicesDiv>
          {services.map(Service => renderService(Service))}
        </ServicesDiv>
      </HowYouCanHelpContainer>
      <MissionValuesContainer>
        <MissionStatement>
          <H2 $color={COLORS.blueMid} style={{ maxWidth: '500px' }}>
            OUR MISSION VALUES
          </H2>
          <H4 $fontWeight="400" style={{ maxWidth: '500px' }}>
            The mission of the Immigration Justice Project (IJP) is to improve
            public awareness of the legal system, to promote the administration
            of justice, and to deliver high-quality legal services. IJP’s goals
            are specifically targeted toward promoting due process and access to
            justice at all levels of the immigration and appellate court systems
            through the provision of high-quality legal services to individuals
            navigating immigration legal proceedings in the San Diego,
            California border region.
          </H4>
          <ButtonDiv>
            <LinkButton
              $primaryColor={COLORS.goldMid}
              $secondaryColor={COLORS.blueDarker}
              href="https://www.americanbar.org/groups/public_interest/immigration/"
            >
              Learn More
            </LinkButton>
          </ButtonDiv>
        </MissionStatement>
        <ImageWrapper>
          <Image
            alt="Lawyer Image"
            src="/HomePage.webp"
            placeholder="blur"
            blurDataURL="/HomePage.webp"
            quality={100}
            layout="fill"
            objectFit="contain"
          />
        </ImageWrapper>
      </MissionValuesContainer>
    </PageContainer>
  );
}
