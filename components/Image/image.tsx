import { ComponentType, useContext } from "react";
import { ThemeContext } from "styled-components";

import Logo from "./assets/logo.svg";
import Menu from "./assets/menu.svg";
import Twitter from "./assets/twitter.svg";
import Discord from "./assets/discord.svg";
import Reddit from "./assets/reddit.svg";
import MagnifyingGlass from "./assets/magnifyingGlass.svg";
import Cross from "./assets/cross.svg";

import { ImageName } from "./types";
import { ImageContainer, StyledImage } from "./image.components";

export interface ImageProps {
  imageName: ImageName;
  // free css overrides
  styleOverrides?: React.CSSProperties;
  forceLightMode?: boolean;
}

// dark theme images
const images: Record<ImageName, ComponentType> = {
  [ImageName.Logo]: Logo,
  [ImageName.Menu]: Menu,
  [ImageName.Twitter]: Twitter,
  [ImageName.Discord]: Discord,
  [ImageName.MagnifyingGlass]: MagnifyingGlass,
  [ImageName.Cross]: Cross,
  [ImageName.Reddit]: Reddit,
};

// gives the images based on color mode
const getImageByTypeAndMode = (imageName: ImageName): ComponentType => {
  return images[imageName];
};

export const Image = (props: ImageProps): JSX.Element => {
  const { imageName, styleOverrides = {} } = props;
  const ImageByType = getImageByTypeAndMode(imageName);

  return (
    <ImageContainer style={styleOverrides}>
      <StyledImage as={ImageByType} />
    </ImageContainer>
  );
};
