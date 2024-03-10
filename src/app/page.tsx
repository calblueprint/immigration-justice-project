'use client';

import COLORS from '@/styles/colors';
import { H5, H3 } from '../styles/text';
import Button from '../components/Button';
import image from '../images/image2.svg';
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
  ServiceDescription,
  ServicesDiv,
  MissionValuesContainer,
  MissionStatement,
} from './styles';

export default function Home() {
  return (
    <PageContainer>
      <TitleSection>
        <H5>IMMIGRATION JUSTICE PROJECT</H5>
        <H3 $color="white" $fontWeight="400">
          The Immigration Justice Project (IJP) seeks to promote due process and
          access to justice through the provision of high quality legal services
          on behalf of indigent immigrants and asylum seekers.
        </H3>
        <ButtonDiv>
          <Button
            $primaryColor={COLORS.goldMid}
            $secondaryColor={COLORS.blueDarker}
          >
            Volunteer Now
          </Button>
        </ButtonDiv>
      </TitleSection>
      <StatisticsSection>
        <StatContainer>
          <StatNumber>100+</StatNumber>
          <StatLabel>Matched Cases</StatLabel>
        </StatContainer>
        <StatContainer>
          <StatNumber>50+</StatNumber>
          <StatLabel>Attorneys</StatLabel>
        </StatContainer>
        <StatContainer>
          <StatNumber>100+</StatNumber>
          <StatLabel>Translation Support</StatLabel>
        </StatContainer>
        <StatContainer>
          <StatNumber>100+</StatNumber>
          <StatLabel>Succesful Outcomes</StatLabel>
        </StatContainer>
      </StatisticsSection>
      <HowYouCanHelpContainer>
        <Title>HOW YOU CAN HELP</Title>
        <Subtitle>
          The Immigration Justice Project seeks to promote due process and
          access to justice for indigent immigrants and asylum seekers.
        </Subtitle>
        <ServicesDiv>
          <ServiceContainer>
            <ServiceIcon
              src="path_to_case_assistance_icon"
              alt="An Icon Will Be here"
            />
            <ServiceTitle>Case Assistance</ServiceTitle>
            <ServiceDescription>
              Attorneys licensed in any state with or without immigration law
              experience can represent immigrants and asylum-seekers in removal
              proceeding before the Immigration Court, the Board of Immigration
              Appeals and the U.S. Court of Appeals for the Ninth Circuit.
            </ServiceDescription>
          </ServiceContainer>
          <ServiceContainer>
            <ServiceIcon
              src="path_to_case_assistance_icon"
              alt="An Icon Will Be here"
            />
            <ServiceTitle>Limited Case Assistance</ServiceTitle>
            <ServiceDescription>
              Law students and recent graduates awaiting bar results can assist
              attorneys to screen potential clients, conduct legal and factual
              research and write motions and briefs in support of on-going court
              cases.
            </ServiceDescription>
          </ServiceContainer>
          <ServiceContainer>
            <ServiceIcon
              src="path_to_case_assistance_icon"
              alt="An Icon Will Be here"
            />
            <ServiceTitle>Translation Assignment</ServiceTitle>
            <ServiceDescription>
              Interpreters and translators can conduct volunteer translation and
              live interpretation. We have frequent need for individuals who
              speak Creole, Portuguese, Spanish, French, Arabic, and Russian.
            </ServiceDescription>
          </ServiceContainer>
        </ServicesDiv>
      </HowYouCanHelpContainer>
      <MissionValuesContainer>
        <img src={image.src} alt="Smaller Stock" />
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
