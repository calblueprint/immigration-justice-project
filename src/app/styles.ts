import Image from 'next/image';
import styled from 'styled-components';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100svh;
`;

export const TitleSection = styled.div`
  position: relative;
  width: 100%;
  height: calc(100svh - ${CONFIG.navbarHeight}px);
  display: flex;
  flex-direction: column;
`;

export const StatisticsSection = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  margin-bottom: 1.25rem;
`;

export const StatInnerContainer = styled.div`
  width: 75rem;
  display: flex;
  justify-content: space-between;
`;

// Label for each stat
export const StatLabel = styled.div`
  font-size: 1.375rem;
  color: ${COLORS.greyDark};
  width: max-content;
`;

export const StatContainer = styled.div`
  text-align: center;
`;

export const HowYouCanHelpContainer = styled.div`
  width: 100%;
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
  margin-top: 30px;
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
export const ServiceIcon = styled(Image)`
  width: 100%;
  margin-bottom: 10px;
`;

export const MissionValuesContainer = styled.div`
  display: flex;
  background-color: ${COLORS.blueLighter};
  width: 100%;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 80px;
  padding: 62px min(100px, 5vw);
`;

export const MissionStatement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  padding-bottom: 30px;
  flex: 1;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  max-height: 395px;
  padding-top: clamp(5px, 25vh, 200px);
  padding-left: clamp(40px, 10%, 84px);
  z-index: 1;
  gap: clamp(10px, 5vh, 30px);
`;

export const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(#0461b6, #002b52);
  opacity: 0.55;
  z-index: 0;
`;

export const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100svh - ${CONFIG.navbarHeight}px);
  top: 0;
  left: 0;
`;

export const Title = styled.h5<{ $color?: string }>`
  ${sans.style}
  font-size: 5.31rem;
  font-weight: 600;
  color: white;
  line-height: 5.5rem;
  font-size: clamp(1rem, 11vh, 5.31rem);
  margin: 0;
`;

export const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 638 / 415;
  width: 638px;
  flex: 1;
`;

export const Subtitle = styled.h3`
  ${sans.style}
  font-weight: 400;
  color: white;
  font-size: 1.5rem;
  font-size: clamp(0.5rem, 3.5vh, 1.5rem);
`;
