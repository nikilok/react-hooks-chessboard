import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import backdrop from "./icons/backdrop.jpg";
import Load from "./Loader";

const Background = createGlobalStyle`
 html {
    background: url(${backdrop}) no-repeat center center fixed; 
    display: flex;
    justify-content: left;
    align-items: top;
    padding: 50px;
 }
`;
const StartButton = styled.div`
  margin-top: 100px;
  font-size: 4em;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #fafafa;
  }
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
`;

const Version = styled.div`
  font-size: 10px;
  font-family: sans-serif;
  /* font-style: italic; */
  position: fixed;
  right: 10px;
  bottom: -7px;
  color: white;
  height: 23px;
  background-color: black;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 5px;
`;

function Lobby({ quickPlayHandler, isLoading, onGoingGame }) {
  return (
    <React.Fragment>
      <Background />
      <StartButton onClick={quickPlayHandler}>
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
        <Version>
          Copyrights {1900 + new Date().getYear()} Masterchess.de
          {process.env.REACT_APP_VERSION &&
            ` ,ver: ${process.env.REACT_APP_VERSION}`}
        </Version>
      </StartButton>
    </React.Fragment>
  );
}
export default Lobby;
