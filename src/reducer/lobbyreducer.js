import * as types from "./constants";
import socket from "../common/socket";
import { serviceUrl } from "../config.json";
import { getFingerprint } from "../common/chess-utilities";

function lobbyReducer(state, action) {
  switch (action.type) {
    case types.CHECK_RESUME_GAME:
      getFingerprint().then(fingerprint => {
        fetch(`${serviceUrl}/gamestatus/${fingerprint}`)
          .then(response => response.json())
          .then(({ status }) => {
            action.dispatch({ type: types.RESUME_UPDATE, status });
          });
      });
    case types.RESUME_UPDATE:
      return { ...state, onGoingGame: action.status };
    case types.QUICK_PLAY:
      getFingerprint().then(fingerprint => {
        socket.emit("subscribe", fingerprint);
        socket.emit("getGameKey", fingerprint);
      });

      socket.on(
        "getGameKey",
        ({ id: gameID, colorAllocated, clientKey, history, fen }) => {
          // Leave the original room with browser fingerprint, so you no longer listen for new game keys
          socket.emit("unsubscribe", clientKey);
          // Subscribe to the new game room
          socket.emit("subscribe", gameID);
          socket.emit("isGameReady", gameID);
          socket.on("isGameReady", isGameReady => {
            const ready = isGameReady.player2Available;
            if (ready) {
              action.dispatch({
                type: types.STARTGAME,
                gameID,
                colorAllocated,
                history,
                fen
              });
            } else {
              action.dispatch({
                type: types.SEARCHING
              });
            }
          });
        }
      );

    case types.STARTGAME:
      return {
        ...state,
        gameID: action.gameID,
        orientation: action.colorAllocated,
        history: action.history,
        fen: action.fen,
        isLoading: false
      };

    case types.SEARCHING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

export default lobbyReducer;
