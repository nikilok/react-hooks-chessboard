import Chess from "chess.js";
import * as types from "./constants";

function getBoard(chessObj) {
  return chessObj.SQUARES.map(square => {
    return {
      ...(chessObj.get(square) || { type: null, color: null }),
      square
    };
  });
}

function chessReducer(state, action) {
  switch (action.type) {
    case types.INIT_BOARD:
      const chess = new Chess();
      const board = getBoard(chess);
      return { chess, board };
    case types.MOVE:
      const lastMoveStatus =
        state.chess.move({ from: action.from, to: action.to }) || undefined;
      return { ...state, board: getBoard(state.chess), lastMoveStatus };
    default:
      return state;
  }
}

export default chessReducer;
