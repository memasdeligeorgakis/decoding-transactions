import styled from "styled-components";
export const Button = styled.button<{ selected?: boolean }>`
  display: flex;
  justify-items: center;
  align-items: center;

  margin: 0 36px 0 0;
  padding: 0 24px;
  background-color: ${(props) => (props.selected ? "cyan" : "black")};
  color: ${(props) => (props.selected ? "black" : "yellow")};
  /* ${(props) => (props.selected ? "font-weight: bold;" : "")}; */
  border-radius: 99px;
  border: none;
  height: 36px;
  cursor: pointer;

  transition: all 0.2s ease-out;
  &:hover {
    background-color: cyan;
    color: black;
  }
`;
