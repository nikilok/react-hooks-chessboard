import Chess from "chess.js";
import * as types from "./constants";
import socket from "../common/socket";
import { replay, getOppositeColor } from "../common/chess-utilities";

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
      const chess = new Chess(action.fen);
      const board = getBoard(chess);
      const initialLastMove =
        (action.history || []).length > 0 && getLastMoveStatus(action.history);
      socket.on("move", function({ move, promotion }) {
        replay(
          move,
          0,
          action.dispatch,
          action.boardWidth,
          action.orientation,
          promotion
        );
      });

      return {
        ...state,
        chess,
        board,
        gameID: action.gameID,
        orientation: action.orientation,
        restrict: getOppositeColor(action.orientation),
        lastMoveStatus: initialLastMove
      };

    case types.MOVE:
      const lastMoveStatus =
        state.chess.move({
          from: action.from,
          to: action.to,
          promotion: action.promotion
        }) || undefined;
      console.log("TCL: chessReducer -> lastMoveStatus", lastMoveStatus);
      if (action.sendToServer === undefined) {
        if (lastMoveStatus) {
          socket.emit("move", {
            move: [[action.from, action.to]],
            fen: state.chess.fen(),
            promotion: action.promotion,
            gameRoomID: state.gameID
          });
        }
      }
      return {
        ...state,
        board: getBoard(state.chess),
        lastMoveStatus,
        isGameOver: state.chess.game_over(),
        gameOverReason: reasonForGameOver(state.chess),
        history: state.chess.history(),
        animatePiece: undefined
      };

    case types.ANIMATEMOVE:
      const { from, to, boardWidth, orientation, animationDelay } = action;
      const { type, color } = state.chess.get(from);
      const squareWidth = boardWidth / 8;
      return {
        ...state,
        animatePiece: {
          from: getCoords(from, orientation, squareWidth, state.chess.turn),
          to: getCoords(to, orientation, squareWidth, state.chess.turn),
          squareColor: state.chess.square_color(from),
          type,
          color,
          animationDelay
        }
      };

    case types.CLEARHIGHLIGHT:
      return {
        ...state,
        lastMoveStatus: undefined
      };

    case types.REPLAY:
      return { ...state, replayInProgress: action.inProgress };

    case types.DRAGSTART:
      return {
        ...state,
        lastMoveStatus: { from: action.square, maskIcon: true }
      };
    default:
      return state;
  }
}

/**
 * getLastMoveStatus figures out the from and to square of the last move,
 * so it can be used to highlight the from and to squares on the board.
 * Normally the chess.move() returns this object, however when the game starts,
 * looking into the history array and obtaining this information lets you highlight
 * squares upon loading up a game.
 *
 * @param {*} history
 * @returns {from ,to}
 */
function getLastMoveStatus(history) {
  const [from, to] = history.pop()[0];
  return { from, to };
}

/**
 * getCoords Fn returns an object with the 'x' and 'y' pixel coordinates
 * for a given notation (square), a given board orientation ('w','b','auto')
 * and a known square width (width).
 * When orientation is auto, the turn parameter recieves a turn Fn, that
 * tells you whose turn it currently is.
 *
 * @param {*} square
 * @param {*} orientation
 * @param {*} width
 * @param {*} turn
 * @returns {x, y}
 */
function getCoords(square, orientation, width, turn) {
  const colMappingW = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 },
    colMappingB = { a: 7, b: 6, c: 5, d: 4, e: 3, f: 2, g: 1, h: 0 },
    notationSplit = square.split(""),
    rowValue = notationSplit[1],
    colValue = notationSplit[0];
  let x, y;
  if (orientation === "auto") {
    orientation = turn(square);
  }

  if (orientation === "w") {
    x = colMappingW[colValue] * width;
    y = Math.abs(rowValue - 8) * width;
  } else if (orientation === "b") {
    x = colMappingB[colValue] * width;
    y = (rowValue - 1) * width;
  }
  return { x, y };
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
