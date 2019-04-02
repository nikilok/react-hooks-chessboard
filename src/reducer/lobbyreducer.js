import * as types from "./constants";
import socket from "../common/socket";
import { getFingerprint, getOppositeColor } from "../common/chess-utilities";

function lobbyReducer(state, action) {
  let colorAllocated, gameID;
  switch (action.type) {
    case types.QUICK_PLAY:
      getFingerprint().then(fingerprint => {
        socket.emit("subscribe", fingerprint);
        socket.emit("getGameKey", fingerprint);
      });

      socket.on(
        "getGameKey",
        ({ id: gameID, colorAllocated, clientKey, history }) => {
          console.log("TCL: lobbyReducer -> history", history);
          // Leave the original room with browser fingerprint, so you no longer listen for new game keys
          socket.emit("unsubscribe", clientKey);
          // Subscribe to the new game room
          socket.emit("subscribe", gameID);
          console.log("Found game: ", gameID);
          socket.emit("isGameReady", gameID);
          socket.on("isGameReady", isGameReady => {
            const ready = isGameReady.player2Available;
            if (ready) {
              action.dispatch({
                type: types.STARTGAME,
                gameID,
                colorAllocated
              });
            } else {
              action.dispatch({
                type: types.SEARCHING
              });
            }
          });
        }
      );
      return {};

    case types.STARTGAME:
      return {
        gameID: action.gameID,
        orientation: action.colorAllocated,
        isLoading: false
      };

    case types.SEARCHING:
      return {
        isLoading: true
      };
    default:
      return state;
  }
}

export default lobbyReducer;
