import Chess from "chess.js";
import * as types from "./constants";

/**
 * This Fn gets the chess instance and returns the entire boards status.
 * Had to write this implementation as chess.js board() wasn't accessible.
 * This custom fn also applies {type: null, color: null} for empty squares
 * and also leaves the square notation in a 'square' property.
 *
 * @param {*} chessObj
 * @returns {type: 'PieceNotation', color: 'b | w', square: 'squareNotation'}
 */
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
        state.chess.move({
          from: action.from,
          to: action.to,
          promotion: action.promotion
        }) || undefined;
      console.log("TCL: chessReducer -> lastMoveStatus", lastMoveStatus);
      return { ...state, board: getBoard(state.chess), lastMoveStatus };

    default:
      return state;
  }
}

export default chessReducer;
