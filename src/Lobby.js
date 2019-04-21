import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import backdrop from "./icons/backdrop.jpg";
import logo from "./icons/logo.png";
import Load from "./Loader";

const Background = createGlobalStyle`
 html {
    background: url(${backdrop}) no-repeat center center fixed; 
    background-size: cover;
    display: flex;
    justify-content: left;
    align-items: top;
    padding: 50px;
 }
`;
const StartButton = styled.div`
  margin-top: 100px;
  font-size: 3.5em;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  ${props =>
    !props.isLoading &&
    `&:hover {
    color: #e10000;
  }`}
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchLabel = styled.div`
  margin-right: 20px;
`;

const LoadContainer = styled.div`
  margin-top: 10px;
  position: relative;
`;

const Version = styled.div`
  font-size: 10px;
  font-family: sans-serif;
  position: fixed;
  right: 10px;
  bottom: -7px;
  color: white;
  height: 23px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 5px;
`;

const Icon = styled.img`
  height: 117px;
  width: 200px;
`;

function Lobby({ quickPlayHandler, isLoading, onGoingGame }) {
  return (
    <React.Fragment>
      <Background />
      <Icon src={logo} alt="Masterchess.de" />
      <StartButton onClick={quickPlayHandler} isLoading={isLoading}>
        {isLoading ? (
          <Search>
            <SearchLabel>Searching</SearchLabel>
            <LoadContainer>
              <Load width="50px" height="50px" />
            </LoadContainer>
          </Search>
        ) : onGoingGame ? (
          "Rejoin"
        ) : (
          "Quick Play"
        )}
      </StartButton>
      <Version>
        Copyright © {1900 + new Date().getYear()} Masterchess.de
        {process.env.REACT_APP_VERSION && ` ,${process.env.REACT_APP_VERSION}`}
      </Version>
    </React.Fragment>
  );
}
export default Lobby;
