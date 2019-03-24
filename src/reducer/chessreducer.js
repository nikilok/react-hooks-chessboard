import Chess from "chess.js";
import * as types from "./constants";

/**
 * The Chess Reducer Function that handles all the dispatched events
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
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

      return {
        ...state,
        board: getBoard(state.chess),
        lastMoveStatus,
        isGameOver: state.chess.game_over(),
        gameOverReason: reasonForGameOver(state.chess),
        history: state.chess.history()
      };

    default:
      return state;
  }
}

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

/**
 * Fn that figures out the reason the game was concluded.
 *
 * @param {*} chessObj
 * @returns
 */
function reasonForGameOver(chessObj) {
  if (chessObj.in_checkmate()) {
    return "Check Mate";
  } else if (chessObj.in_threefold_repetition()) {
    return "Three Fold Repetition";
  } else if (chessObj.in_draw()) {
    return "Draw";
  } else if (chessObj.in_stalemate()) {
    return "Stale Mate";
  } else if (chessObj.insufficient_material()) {
    return "Insufficent Material Draw";
  }
}

export default chessReducer;
