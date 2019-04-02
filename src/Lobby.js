import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { COLORS } from "./common/modern-theme";
import backdrop from "./icons/backdrop.jpg";

const Background = createGlobalStyle`
 html {
    background: url(${backdrop}) no-repeat center center fixed; 
    background-size: cover;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 20px;
 }
`;
const StartButton = styled.div`
  font-size: 4em;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    color: grey;
  }
`;

function Lobby({ quickPlayHandler, isLoading }) {
  return (
    <React.Fragment>
      <Background />
      <StartButton onClick={quickPlayHandler}>
        {isLoading ? "Searching..." : "Start"}
      </StartButton>
    </React.Fragment>
  );
}
export default Lobby;
