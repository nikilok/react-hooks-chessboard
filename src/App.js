import React, { useReducer, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import lobbyReducer from "./reducer/lobbyreducer";
import * as types from "./reducer/constants";
import NotificationContext from "./context/NotificationContext";

import Game from "./Game";
import Lobby from "./Lobby";

function App() {
  const [lobbyState, dispatch] = useReducer(lobbyReducer, {
    gameID: undefined,
    orientation: undefined,
    isLoading: undefined,
    fingerprint: undefined
  });
  const notify = useContext(NotificationContext);

  useEffect(() => {
    dispatch({ type: types.CHECK_RESUME_GAME, dispatch });
  }, []);

  function quickPlay() {
    dispatch({ type: types.QUICK_PLAY, dispatch, notify });
  }

  function leaveGame() {
    dispatch({ type: types.LEAVEGAME, dispatch });
  }

  if (lobbyState.gameID) {
    return (
      <Game
        gameID={lobbyState.gameID}
        orientation={lobbyState.orientation}
        history={lobbyState.history}
        fen={lobbyState.fen}
        leaveGameHandler={leaveGame}
      />
    );
  }

  return (
    <Router>
      <Route
        exact={true}
        path="/*"
        render={() => (
          <Lobby
            quickPlayHandler={quickPlay}
            isLoading={lobbyState.isLoading}
            onGoingGame={lobbyState.onGoingGame}
          />
        )}
      />
    </Router>
  );
}

export default App;
