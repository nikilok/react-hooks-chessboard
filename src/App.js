import React, { useEffect, useReducer, useState } from "react";
import { COLORS } from "./common/modern-theme";
import ChessContext from "./context";
import chessReducer from "./reducer/chessreducer";
import * as types from "./reducer/constants";
import styled from "styled-components";
import Board from "./Board";
import Promotion from "./Board/promotion";
import Modal from "./Modal";

const Container = styled.div`
  text-align: center;
`;

const TableBackground = styled.div`
  background-color: ${COLORS.TABLEBACKGROUND};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [state, dispatch] = useReducer(chessReducer, {
    chess: { turn: () => {} },
    board: []
  });
  const [showPromotionUI, setShowPromotionUI] = useState(false);
  const [moveDrag, setMoveDrag] = useState({
    start: "",
    to: "",
    color: "",
    type: ""
  });

  /** Example moves only for testing a sequence of moves */
  const moves = [
    ["e2", "e4"],
    ["e7", "e5"],
    ["f1", "b5"],
    ["f7", "f6"],
    ["g1", "h3"],
    ["b8", "a6"],
    ["b5", "a6"],
    ["b7", "a6"],
    ["e1", "g1"],
    ["c8", "b7"],
    ["b1", "c3"],
    ["d8", "e7"],
    ["f2", "f3"],
    ["e8", "c8"]
  ];

  useEffect(() => {
    dispatch({ type: types.INIT_BOARD });
    // replay(moves, 2000);
  }, []);

  /**
   * Replay function takes in a moves array and replays it on the board.
   * The timeout variable takes the milliseconds to wait before playing the next move.
   *
   * @param {*} moves
   * @param {number} [timeout=1000]
   */
  function replay(moves, timeout = 1000) {
    const [from, to] = moves.shift();

    setTimeout(() => {
      dispatch({ type: types.MOVE, from, to });
      if (moves.length > 0) {
        replay(moves, timeout);
      }
    }, timeout);
  }

  /**
   * The Fn is called when the user starts to drag a chess piece.
   * It populates the starting square, the color of the person making the move
   * and the type of piece moved into the MoveDrag state object.
   *
   * @param {*} square
   * @param {*} color
   * @param {*} type
   */
  function dragStart(square, color, type) {
    setMoveDrag({ start: square, color, type });
  }

  /**
   * The Drop Fn is triggered when the user finishes dragging a chess piece
   * on to the board.
   *
   * @param {*} square
   */
  function drop(square) {
    const { start, color, type } = moveDrag;
    const rowNumber = square.split("")[1];

    if (!isPromotion(rowNumber, color, type, start, square)) {
      dispatch({ type: types.MOVE, from: start, to: square });
    } else {
      setMoveDrag({ ...moveDrag, to: square });
      setShowPromotionUI(true);
    }
  }

  /**
   * Event handler for when a successful Pawn promotion is made.
   * The Fn closes the Promotion UI after the user has made a choice.
   *
   * @param {*} promotedPiece
   */
  function promotionHandler(promotedPiece) {
    const { start, to } = moveDrag;
    dispatch({
      type: types.MOVE,
      from: start,
      to,
      promotion: promotedPiece
    });
    setShowPromotionUI(false);
  }

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
  function isPromotion(rowNumber, color, type, from, to) {
    if (
      (rowNumber === "8" && color === "w" && type === "p") ||
      (rowNumber === "1" && color === "b" && type === "p")
    ) {
      if (isMoveValid(from, to)) {
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
  function getValidMoves(from) {
    const validMovesVerbose = state.chess.moves({
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
  function isMoveValid(from, to) {
    return getValidMoves(from).includes(to);
  }

  return (
    <ChessContext.Provider value={{ dragStart, drop }}>
      <Container>
        <TableBackground>
          <Board
            width="800"
            config={{
              showSquareLetters: true,
              orientation: "w",
              showMoveHighlights: true
            }}
            position={state.board}
            lastMoveStatus={state.lastMoveStatus}
            turn={state.chess.turn}
          />
        </TableBackground>

        {showPromotionUI && (
          <Promotion
            color={moveDrag.color}
            promotionHandler={promotionHandler}
          />
        )}

        {state.isGameOver && (
          <Modal title="Game Over">{state.gameOverReason}</Modal>
        )}
      </Container>
    </ChessContext.Provider>
  );
}

export default App;
