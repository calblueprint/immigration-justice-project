'use client';

import COLORS from '@/styles/colors';
import Image from 'next/image';
import { H5, H3, H4 } from '../styles/text';
import Button from '../components/Button';

import {
  TitleSection,
  PageContainer,
  ButtonDiv,
  StatisticsSection,
  StatNumber,
  StatLabel,
  StatContainer,
  HowYouCanHelpContainer,
  Title,
  Subtitle,
  ServiceContainer,
  ServiceIcon,
  ServiceTitle,
  ServicesDiv,
  MissionValuesContainer,
  MissionStatement,
  Test,
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
    <StatNumber>{stat.number}</StatNumber>
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
    <ServiceTitle>{service.title}</ServiceTitle>
    <H4 $color={COLORS.greyDark}>{service.description}</H4>
  </ServiceContainer>
);

export default function Home() {
  return (
    <PageContainer>
      <TitleSection>
        <Image
          alt="background"
          src="/HomePage.webp"
          placeholder="blur"
          blurDataURL="/HomePage.webp"
          quality={100}
          fill
        />
        <Test>
          <H5>IMMIGRATION JUSTICE PROJECT</H5>
          <H3 $color="white" $fontWeight="400">
            The Immigration Justice Project (IJP) seeks to promote due process
            and access to justice through the provision of high quality legal
            services on behalf of indigent immigrants and asylum seekers.
          </H3>
          <ButtonDiv>
            <Button
              $primaryColor={COLORS.goldMid}
              $secondaryColor={COLORS.blueDarker}
            >
              Volunteer Now
            </Button>
          </ButtonDiv>
        </Test>
      </TitleSection>
      <StatisticsSection>
        {stats.map(stat => renderStat(stat))}
      </StatisticsSection>
      <HowYouCanHelpContainer>
        <Title>HOW YOU CAN HELP</Title>
        <Subtitle>
          The Immigration Justice Project seeks to promote due process and
          access to justice for indigent immigrants and asylum seekers.
        </Subtitle>
        <ServicesDiv>
          {services.map(Service => renderService(Service))}
        </ServicesDiv>
      </HowYouCanHelpContainer>
      <MissionValuesContainer>
        <Image
          alt="Mountains"
          src="/HomePage.webp"
          placeholder="blur"
          blurDataURL="/HomePage.webp"
          quality={100}
          width={521}
          height={338}
        />
        <MissionStatement>
          <Title>OUR MISSION VALUES</Title>
          <Subtitle>
            The mission of the Immigration Justice Project (IJP) is to improve
            public awareness of the legal system, to promote the administration
            of justice, and to deliver high-quality legal services. IJP’s goals
            are specifically targeted toward promoting due process and access to
            justice at all levels of the immigration and appellate court systems
            through the provision of high-quality legal services to individuals
            navigating immigration legal proceedings in the San Diego,
            California border region.
          </Subtitle>
          <ButtonDiv>
            <Button
              $primaryColor={COLORS.goldMid}
              $secondaryColor={COLORS.blueDarker}
            >
              Volunteer Now
            </Button>
          </ButtonDiv>
        </MissionStatement>
      </MissionValuesContainer>
    </PageContainer>
  );
}
