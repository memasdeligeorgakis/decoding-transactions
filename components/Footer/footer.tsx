import { Image, ImageName } from "../../components/Image";
import {
  FooterContainer,
  LeftAlignedSection,
  RightAlignedSection,
  Column,
  RightColumns,
  FooterLink,
  FooterLinkState,
  SocialsContainer,
  SocialsButton,
  TestnetUpdatesButtonContainer,
  TestnetUpdatesButton,
} from "./footer.components";

export enum Pages {
  Talks,
  TrustedSetup,
}

interface FooterProps {
  selectedPage: Pages;
}

export const Footer = (props: FooterProps): JSX.Element => {
  return (
    <FooterContainer>
      <LeftAlignedSection>
        <RightColumns>
          <FooterLink href="https://namada.net">Home</FooterLink>
          <FooterLink href="https://blog.namada.net">Blog</FooterLink>
          <FooterLink
            href="https://namada.net"
            footerLinkState={FooterLinkState.disabled}
          >
            Talks
          </FooterLink>
          <FooterLink href="https://specs.namada.net">Specs</FooterLink>
          <FooterLink href="https://docs.namada.net">Docs</FooterLink>
        </RightColumns>
        <RightColumns>
          <FooterLink href="https://namada.net/trusted-setup.html">
            Trusted setup
          </FooterLink>
          <FooterLink footerLinkState={FooterLinkState.selected}>
            Ceremony
          </FooterLink>
        </RightColumns>
      </LeftAlignedSection>
      <RightAlignedSection>
        <Column>
          <TestnetUpdatesButtonContainer>
            <a href="https://dev.us7.list-manage.com/subscribe?u=69adafe0399f0f2a434d8924b&id=263f552276">
              <TestnetUpdatesButton>Testnet updates</TestnetUpdatesButton>
            </a>
          </TestnetUpdatesButtonContainer>
          <FooterLink>
            <SocialsContainer>
              <SocialsButton
                onClick={() => {
                  const win: Window = window;
                  win.location = "https://twitter.com/namadanetwork";
                }}
              >
                <Image
                  styleOverrides={{ color: "black" }}
                  imageName={ImageName.Twitter}
                />
              </SocialsButton>
              <SocialsButton
                onClick={() => {
                  const win: Window = window;
                  win.location = "https://www.reddit.com/r/Namada";
                }}
              >
                <Image imageName={ImageName.Reddit} />
              </SocialsButton>
            </SocialsContainer>
          </FooterLink>
        </Column>
      </RightAlignedSection>
    </FooterContainer>
  );
};
