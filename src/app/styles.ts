import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100svh;
`;

export const TitleSection = styled.div`
  position: relative;
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
`;

export const ButtonDiv = styled.div`
  margin-top: 25px;
  width: clamp(180px, 2vh, 500px);
  height: clamp(20px, 2vh, 60px);
`;

export const StatisticsSection = styled.div`
  width: 100%;
  height: 146px;
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
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 58px;
  padding-bottom: 50px;
`;

// Service container
export const ServicesDiv = styled.div`
  display: grid;
  flex-direction: row;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 60px;
  gap: clamp(20px, 7vw, 90px);
  width: 100%;
  padding-left: clamp(30px, 13vw, 140px);
  padding-right: clamp(30px, 13vw, 140px);
`;
export const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  margin: 10px;
`;

// Service icon
export const ServiceIcon = styled.img`
  height: 50px;
  margin-bottom: 10px;
`;

export const MissionValuesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; // Example adjustment
  grid-template-rows: auto;
  background-color: ${COLORS.blueLighter};
  width: 100%;
  min-height: 488px;
  align-items: center;
  justify-content: space-around;
  gap: 40px;
  padding: 73px 128px;
`;
export const MissionStatement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const TextContainer = styled.div`
  max-width: 900px;
  max-height: 395px;
  padding-top: clamp(5px, 25vh, 200px);
  padding-left: clamp(40px, 10%, 84px);
  z-index: 1;
  gap: 50px;
`;
export const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(40, 120, 194, 0.5);
  z-index: 0;
`;
export const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100svh;
  top: 0;
  left: 0;
`;
export const Title = styled.h5<{ $color?: string }>`
  ${openSans.style}
  font-size: 5.31rem;
  font-weight: 600;
  color: white;
  font-size: clamp(1rem, 11vh, 5.31rem);
  margin: 0;
`;
export const ImageWrapper = styled.div`
  width: 100%; // Ensure it fills the grid area
  height: 100%;
  position: relative;
  display: flex;
  justify-self: end;
`;
export const Subtitle = styled.h3`
  ${openSans.style}
  font-weight: 400;
  color: white;
  font-size: 1.5rem;
  font-size: clamp(0.5rem, 3.5vh, 1.5rem);
`;
