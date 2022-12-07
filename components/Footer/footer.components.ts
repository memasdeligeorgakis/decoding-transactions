import styled from "styled-components";
import { Button } from "../../components/StyledComponentButton";

export const TestnetUpdatesButtonContainer = styled.div`
  margin: 0 0 16px;
`;

export const TestnetUpdatesButton = styled(Button)`
  height: 57px;

  background-color: yellow;
  color: black;

  font-weight: bold;
`;
export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 32px;

  color: white;
`;

export const LeftAlignedSection = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 32px 0;
`;

export const RightAlignedSection = styled.div`
  display: flex;
  justify-content: end;

  margin: 32px 0;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightColumns = styled(Column)`
  margin: 0 64px 0 0;
`;

export const FooterLinkContainer = styled.div`
  display: flex;
  height: 48px;
  cursor: pointer;
`;
export const SocialsContainer = styled.div`
  display: flex;
`;

export const SocialsButton = styled.div`
  display: flex;
  justify-content: center;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: yellow;
  border-radius: 99px;
  padding: 8px;
  margin: 0 16px 0 0;
  width: 60px;
  height: 60px;

  & * > path {
    fill: black;
  }

  &:hover {
    background-color: cyan;
  }
`;

export enum FooterLinkState {
  selected,
  disabled,
}

const getFooterLinkColor = (footerLinkState?: FooterLinkState) => {
  switch (footerLinkState) {
    case FooterLinkState.selected:
      return "cyan";
    case FooterLinkState.disabled:
      return "grey";
    default:
      return "yellow";
  }
};
export const FooterLink = styled.a<{ footerLinkState?: FooterLinkState }>`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => getFooterLinkColor(props.footerLinkState)};
  cursor: pointer;
`;
