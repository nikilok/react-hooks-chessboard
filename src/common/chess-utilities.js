import * as types from "../reducer/constants";
import FingerprintJS from "@fingerprintjs/fingerprintjs"

/**
 * Fn that figures out if a White or Black pawn has trigerred a promotion.
 * Returns True or False indicating if Promotion was triggered or not.
 *
 * @param {*} rowNumber
 * @param {*} color
 * @param {*} type
 * @param {*} from
 * @param {*} to
 * @returns
 */
function isPromotion(rowNumber, color, type, from, to, chessInstance) {
  if (
    (rowNumber === "8" && color === "w" && type === "p") ||
    (rowNumber === "1" && color === "b" && type === "p")
  ) {
    if (isMoveValid(from, to, chessInstance)) {
      return true;
    }
  }
  return false;
}

/**
 * Fn that returns an Array of all valid moves for a given square notation
 *
 * @param {*} from
 * @returns
 */
function getValidMoves(from, chessInstance) {
  const validMovesVerbose = chessInstance.moves({
    square: from,
    verbose: true
  });
  return Array.from(new Set(validMovesVerbose.map(({ to }) => to)));
}

/**
 * Fn that figures out if the given From (Square Notation) -> To (Square Notation)
 * move is valid or not. Returns a True (Valid) or False (InValid)
 *
 * @param {*} from
 * @param {*} to
 * @returns
 */
function isMoveValid(from, to, chessInstance) {
  return getValidMoves(from, chessInstance).includes(to);
}

/**
 * Replay function takes in a moves array and replays it on the board.
 * The timeout variable takes the milliseconds to wait before playing the next move.
 *
 * @param {*} moves
 * @param {number} [timeout=1000]
 */
function replay(
  moves,
  timeout = 0,
  dispatch,
  boardWidth,
  orientation,
  promotion = null
) {
  dispatch({ type: types.REPLAY, inProgress: true });
  recursiveReplay(moves, timeout);

  function recursiveReplay(moves, timeout) {
    const [from, to] = moves.shift();
    const animationDelay = 600;
    setTimeout(() => {
      dispatch({
        type: types.ANIMATEMOVE,
        from,
        to,
        boardWidth,
        orientation,
        animationDelay
      });
      setTimeout(() => {
        dispatch({
          type: types.MOVE,
          from,
          to,
          sendToServer: false,
          promotion,
          leaveGameHandler: () => {}
        });
        if (moves.length > 0) {
          recursiveReplay(moves, timeout);
        } else {
          dispatch({ type: types.REPLAY, inProgress: false });
        }
      }, animationDelay); // Time period for completing the transition animation of the chess piece
    }, timeout);
  }
}

/**
 * Generates a unique browser key.
 */
async function getFingerprint() {
  // Initialize an agent at application startup.
  const fpPromise = FingerprintJS.load();

  // Get the visitor identifier when you need it.
  const fp = await fpPromise;
  const result = await fp.get();
  return result.visitorId;
}

function getOppositeColor(color) {
  return color === "w" ? "b" : "w";
}
export {
  isPromotion,
  getValidMoves,
  isMoveValid,
  replay,
  getFingerprint,
  getOppositeColor
};
