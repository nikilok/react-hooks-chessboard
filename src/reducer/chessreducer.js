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
        isGameOver: isGameOver(state.chess),
        gameOverReason: reasonForGameOver(state.chess),
        history: history(state.chess)
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
 * Fn that returns true or false indicating if the Game is over
 *
 * @param {*} chessObj
 * @returns
 */
function isGameOver(chessObj) {
  return chessObj.game_over();
}

/**
 * Fn that returns true or false indicating if it was a Checkmate
 *
 * @param {*} chessObj
 * @returns
 */
function isCheckMate(chessObj) {
  return chessObj.in_checkmate();
}

/**
 * Fn that returns true or false indicating if it was a Draw,
 * Returns true or false if the game is drawn (50-move rule or insufficient material).
 *
 * @param {*} chessObj
 * @returns
 */
function isDraw(chessObj) {
  return chessObj.in_draw();
}

/**
 * Returns true or false if the side to move has been stalemated.
 *
 * @param {*} chessObj
 * @returns
 */
function isStaleMate(chessObj) {
  return chessObj.in_stalemate();
}

/**
 * Returns true or false if the current board position has occurred three or more times.
 *
 * @param {*} chessObj
 * @returns
 */
function isThreeFoldRepetition(chessObj) {
  return chessObj.in_threefold_repetition();
}

/**
 * Returns true if the game is drawn due to insufficient material
 * (K vs. K, K vs. KB, or K vs. KN); otherwise false.
 *
 * @param {*} chessObj
 * @returns
 */
function isInsufficentMaterial(chessObj) {
  return chessObj.insufficient_material();
}

/**
 * Fn that figures out the reason the game was concluded.
 *
 * @param {*} chessObj
 * @returns
 */
function reasonForGameOver(chessObj) {
  if (isCheckMate(chessObj)) {
    return "Check Mate";
  } else if (isThreeFoldRepetition(chessObj)) {
    return "Three Fold Repetition";
  } else if (isDraw(chessObj)) {
    return "Draw";
  } else if (isStaleMate(chessObj)) {
    return "Stale Mate";
  } else if (isInsufficentMaterial(chessObj)) {
    return "Insufficent Material Draw";
  }
}

/**
 * Returns the game history in an array
 *
 * @param {*} chessObj
 * @returns
 */
function history(chessObj) {
  return chessObj.history();
}

export default chessReducer;
