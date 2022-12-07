import {
  HeroBannerContainer,
  HeroBannerImagesContainer,
  HeroBannerImageContainer,
  HeroBannerCatContainer,
  HeroBannerLogoContainer,
  HeroBannerHammerContainer,
  HeroBannerDataContainer,
} from "./HeroBanner.components";
import { default as NextImage } from "next/image";
import Cat from "./assets/namada_cat.png";
import Hammer from "./assets/namada_hammer.png";
import LogoInBanner from "./assets/namada_logo_in_banner.png";

import { Image, ImageName } from "../../components/Image";

export const HeroBanner = (): JSX.Element => {
  return (
    <HeroBannerContainer>
      <HeroBannerDataContainer>AAA</HeroBannerDataContainer>
      <HeroBannerImagesContainer>
        {/* <HeroBannerImageContainer style={{ justifyContent: "flex-start" }}> */}
        <HeroBannerCatContainer>
          <NextImage
            src={Cat}
            alt="cat"
            style={{ width: "auto", height: "128px" }}
          />
        </HeroBannerCatContainer>
        {/* </HeroBannerImageContainer> */}

        {/* <HeroBannerImageContainer style={{ justifyContent: "center" }}> */}
        <HeroBannerLogoContainer>
          <NextImage
            src={LogoInBanner}
            alt="logo"
            style={{ width: "auto", height: "58px" }}
          />
        </HeroBannerLogoContainer>
        {/* </HeroBannerImageContainer> */}

        {/* <HeroBannerImageContainer style={{ justifyContent: "flex-end" }}> */}
        <HeroBannerHammerContainer>
          <NextImage
            src={Hammer}
            alt="hammer"
            style={{ width: "auto", height: "128px" }}
          />
        </HeroBannerHammerContainer>
        {/* </HeroBannerImageContainer> */}
      </HeroBannerImagesContainer>
    </HeroBannerContainer>
  );
};
