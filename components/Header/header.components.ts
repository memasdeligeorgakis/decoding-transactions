import styled from "styled-components";

export const HeaderContainer = styled.div`
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
`;

export const RightAlignedSection = styled.div`
  display: flex;
  justify-content: end;

  cursor: pointer;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 32px;
`;

export const FooterLinkContainer = styled.div`
  display: flex;
  height: 48px;
`;
export const FooterLink = styled.a`
  font-size: 1.5em;
`;

export const MenuContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: black;
`;

export const CloseMenuContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;

  padding: 16px 32px;
  z-index: 9999;
  cursor: pointer;
`;
