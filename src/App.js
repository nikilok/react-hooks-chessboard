import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import lobbyReducer from "./reducer/lobbyreducer";
import * as types from "./reducer/constants";

import Game from "./Game";
import Lobby from "./Lobby";

function App() {
  const [lobbyState, dispatch] = useReducer(lobbyReducer, {
    gameID: undefined,
    orientation: undefined,
    noPlayers: undefined,
    isLoading: undefined
  });

  function quickPlay() {
    console.log("Quick Play Search");
    dispatch({ type: types.QUICK_PLAY, dispatch });
  }

  if (lobbyState.gameID) {
    console.log("TCL: App -> lobbyState.gameID", lobbyState.gameID);
    return (
      <Game
        gameID={lobbyState.gameID}
        orientation={lobbyState.orientation}
        history={lobbyState.history}
        fen={lobbyState.fen}
      />
    );
  }

  return (
    <Router>
      <Route
        exact={true}
        path="/"
        render={() => (
          <Lobby
            quickPlayHandler={quickPlay}
            isLoading={lobbyState.isLoading}
          />
        )}
      />

      {/* <Route
        exact={true}
        path="/g/:gameId"
        render={({ match }) => (
          <Game
            match={match}
            gameID={lobbyState.gameID}
            orientation={lobbyState.orientation}
          />
        )}
      /> */}
    </Router>
  );
}

export default App;
