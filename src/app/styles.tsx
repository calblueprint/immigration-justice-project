import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import image from '../../public/HomePage.webp';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const TitleSection = styled.div`
  width: 100%;
  height: 100vh; // Use 100vh to make the div fill the entire viewport height
  /* background: linear-gradient(
      222deg,
      rgba(40, 120, 194, 0.5) 14.2%,
      rgba(0, 50, 96, 0.5) 76.27%
    ),
    url(${image.src}) no-repeat center / cover; */
  display: flex;
  flex-direction: column;
  padding-top: 200px;
  padding-right: 440px;
  padding-left: 84px;
  background: linear-gradient(
    222deg,
    rgba(40, 120, 194, 0.5) 14.2%,
    rgba(0, 50, 96, 0.5) 76.27%
  );
  gap: 30px;
  z-index: 1;
`;

export const ButtonDiv = styled.div`
  width: 244px;
  height: 40px;
`;

export const StatisticsSection = styled.div`
  width: 100%;
  height: 146;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  padding-top: 33px;
  padding-bottom: 35px;
`;
export const StatNumber = styled.div`
  font-size: 35px;
  color: ${COLORS.blueMid};
  font-weight: 500px;
  margin-bottom: 5px;
`;

// Label for each stat
export const StatLabel = styled.div`
  font-size: 22px;
  color: ${COLORS.greyDark};
`;
export const StatContainer = styled.div`
  text-align: center;
`;
export const HowYouCanHelpContainer = styled.div`
  background-color: ${COLORS.background};
  width: 100%;
  height: 557px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 70px;
`;

// Title and subtitle
export const Title = styled.h1`
  ${openSans.style}
  font-size: 35px;
  font-weight: 500px;
  color: ${COLORS.blueMid};
`;

export const Subtitle = styled.p`
  ${openSans.style}
  font-size: 16px;
  color: ${COLORS.greyDark};
`;

// Service container
export const ServicesDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 60px;
  gap: 90px;
  padding-left: 190px;
  padding-right: 190px;
`;
export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin: 10px;
`;

// Service icon
export const ServiceIcon = styled.img`
  height: 50px;
  margin-bottom: 10px;
`;

// Service title
export const ServiceTitle = styled.h2`
  font-size: 20px;
  color: ${COLORS.blueMid};
`;

export const MissionValuesContainer = styled.div`
  background-color: ${COLORS.blueLighter};
  width: 100%;
  height: 488px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 160px;
  padding-right: 200px;
  gap: 53px;
`;
export const MissionStatement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const Test = styled.div`
  z-index: 10;
  background: linear-gradient(
    222deg,
    rgba(40, 120, 194, 0.5) 14.2%,
    rgba(0, 50, 96, 0.5) 76.27%
  );
`;
