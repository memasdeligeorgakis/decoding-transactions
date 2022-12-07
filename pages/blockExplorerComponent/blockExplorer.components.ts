import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { Button } from "../../components/StyledComponentButton";

export const TrustedSetupContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
`;

export const TrustedSetupInnerContainer = styled.main`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: yellow;
  background-image: url(/BackgroundPattern.svg);
  background-size: 64px;
  min-height: 256px;
`;

export const MiddleSectionOfContainerOnlyMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BannerContainer = styled.div`
  display: flex;
`;

export const TrustedSetupBannerContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 456px;
  max-width: 600px;
  min-height: 256px;
  margin: 0 0 32px 0;

  background-image: url(/namada_banner_background.png);
  background-size: contain;
  background-repeat: no-repeat;

  @media screen and (max-width: 640px) {
    background-image: unset;
    background-size: unset;
    background-repeat: unset;
    background-color: yellow;
    border-radius: 16px;
  }
`;

export const ImageContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
`;
export const TimeCountDownContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: -164px;
`;
export const TimeCountDownContainerOnlyMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 640px) {
    margin: 0 0 32px;
  }
`;
export const TimeCountDownContainerTopLabel = styled.h3`
  display: flex;
  justify-content: center;
  position: absolute;

  width: 140px;
  margin-top: 160px;
  margin-left: -52px;

  @media screen and (max-width: 640px) {
    margin-top: 124px;
  }
`;

export const TimeCountDownContainerTopLabelOnlyMobile = styled.h3`
  display: flex;
  justify-content: center;
  width: 140px;
  /* margin: 8px 0; */
  margin: 10px 0px -5px 0px; ;
`;
export const TimeCountDownTimeHeader = styled.h3`
  display: flex;
  justify-content: space-between;
  position: absolute;

  width: 140px;
  margin-top: 185px;
  margin-left: -52px;

  @media screen and (max-width: 640px) {
    margin-top: 150px;
  }
`;

export const TimeCountDownTimeHeaderOnlyMobile = styled.h3`
  display: flex;
  justify-content: space-between;

  width: 150px;
  margin: 8px 0;
`;
export const TimeCountDownLabelCharacterContainer = styled.span`
  padding: 0 2px;
`;
export const TimeCountDownLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  position: absolute;

  width: 78px;
  margin-top: 210px;
  /* margin-left: -22px; */
  margin-left: -27px;
  font-size: 10;
  font-weight: medium;

  @media screen and (max-width: 640px) {
    margin-top: 175px;
  }
`;

export const TimeCountDownLabelContainerOnlyMobile = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;

  width: 78px;
  font-size: 10;
  font-weight: medium;

  margin-left: -12px;
`;

export const BannerNamadaLogo = styled(Image)`
  height: 94px;
  width: auto;
  margin-top: 66px;

  @media screen and (max-width: 640px) {
    height: auto;
    width: 90%;
    margin-left: 5%;
  }
`;

const moveCatAnimation = keyframes`
  0% {
    transform: translate(-10px, -15px);
  }
  25% {
    transform: translate(-2px, -12px);
  }
  50% {
    transform: translate(5px, 0px);
  }
  75% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(-10px, -15px);
  }
`;

export const CatImage = styled(Image)`
  height: 100%;
  width: auto;

  margin-top: -96px;
  margin-top: -26px;
  margin-left: -410px;
  margin-left: -310px;
  margin-right: 124px;
  margin-right: 24px;
  animation: ${moveCatAnimation} 1s linear infinite;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const HammerImage = styled(Image)`
  height: 100%;
  margin-left: 168px;
  margin-top: -84px;
  width: auto;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const TrustedSetupTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding: 0 32px 32px;
`;

export const TableUtilsRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin: 16px 0 16px;
`;

export const TableUtilsSubRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin: 0 0 16px;
`;

export const TableUtilsRowItem = styled.div`
  display: flex;
  align-items: center;

  margin: 0 32px 0 0;
`;

export const TableUtilsRowRightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TableUtilsItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 0 0;
`;

export const CohortLabel = styled.span`
  margin: 0 16px 0;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 300px;

  /* hacks to make scrollable but hide the bar */
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CeremonyRoundVerifyButton = styled(Button)``;

export const CeremonyRoundSelect = styled.select`
  display: flex;
  justify-items: center;
  justify-content: center;

  cursor: pointer;

  margin: 0 36px 0 0;
  padding: 0 0 0 8px;
  border: 1.5px solid black;
  background-color: yellow;
  border-radius: 99px;
  height: 36px;
  width: 64px;

  -webkit-appearance: none;
  &:focus {
    outline: 0;
  }

  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
`;

export const FilterInput = styled.input`
  border: 1.5px solid black;
  appearance: none;
  outline: none;
  background-color: yellow;
  border-radius: 99px;
  height: 36px;
  padding: 0 0 0 32px;
`;

export const SearchIconContainer = styled.div`
  margin-right: -24px;
  z-index: 999;
`;

export const VerifyContributionModalContainer = styled.div`
  display: flex;
  word-wrap: break-word;
  display: inline-block;
  width: 100%;
`;
