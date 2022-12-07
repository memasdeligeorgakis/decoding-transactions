import { useState } from "react";
import {
  HeaderContainer,
  LeftAlignedSection,
  RightAlignedSection,
  MenuContainer,
  CloseMenuContainer,
} from "./header.components";
import { Image, ImageName } from "../Image";
import { Footer, Pages } from "../Footer";

interface HeaderProps {
  selectedPage: Pages;
}

export const Header = (props: HeaderProps): JSX.Element => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  return (
    <HeaderContainer>
      {isBurgerMenuOpen && (
        <MenuContainer>
          <CloseMenuContainer
            onClick={() => {
              setIsBurgerMenuOpen(false);
            }}
          >
            <Image imageName={ImageName.Cross} />
          </CloseMenuContainer>
          <Footer selectedPage={props.selectedPage} />
        </MenuContainer>
      )}

      <LeftAlignedSection
        style={{ cursor: "pointer" }}
        onClick={() => {
          const win: Window = window;
          win.location = "https://namada.net";
        }}
      >
        <Image imageName={ImageName.Logo} />
      </LeftAlignedSection>
      <RightAlignedSection
        onClick={() => {
          setIsBurgerMenuOpen(true);
        }}
      >
        <Image imageName={ImageName.Menu} />
      </RightAlignedSection>
    </HeaderContainer>
  );
};
