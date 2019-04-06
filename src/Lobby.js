import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import backdrop from "./icons/backdrop.jpg";
import Load from "./Loader";
import OneAccount from "oneaccount-react";

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

function Lobby({ quickPlayHandler, isLoading, onGoingGame }) {
  return (
    <React.Fragment>
      <Background />
      <OneAccount
        externalId="3cac812d-8556-4478-b5ab-32903e124562"
        floatingMode={true}
        useSMIL={true}
        useFilter={true}
        onUpdate={uid => {
          console.log("TCL: Lobby -> uid", uid);
        }}
      />
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
      </StartButton>
    </React.Fragment>
  );
}
export default Lobby;
