import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const TitleSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; // Use 100vh to make the div fill the entire viewport height
  display: flex;
  flex-direction: column;
  // padding-top: 200px;
  // padding-right: 400px;
  /* padding-left: 84px;
  padding-bottom: 150px; */
`;

export const ButtonDiv = styled.div`
  margin-top: 25px;
  width: clamp(224px, 25%, 500px);
  height: clamp(40px, 5vh, 60px);
`;

export const StatisticsSection = styled.div`
  width: 100%;
  height: 146;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  padding-top: 33px;
  padding-bottom: 35px;
  margin-bottom: 20px;
`;

// Label for each stat
export const StatLabel = styled.div`
  font-size: 1.375rem;
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
  position: relative;
`;
export const MissionStatement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  // position: relative;
`;

export const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100vh; */
  padding-top: 200px;
  //padding-right: 550px;
  padding-left: 84px;
  padding-bottom: 150px;
  z-index: 10;
  padding-right: 600px;
  gap: 50px;
`;
export const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(40, 120, 194, 0.5); // Red overlay with 50% opacity
  z-index: 1;
`;
export const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
export const Title = styled.h5<{ $color?: string }>`
  ${openSans.style}
  font-size: 5.31rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;
