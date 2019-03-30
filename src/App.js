import React, { useEffect, useReducer, useState } from "react";
import { COLORS } from "./common/modern-theme";
import ChessContext from "./context";
import chessReducer from "./reducer/chessreducer";
import * as types from "./reducer/constants";
import styled from "styled-components";
import Board from "./Board";
import Promotion from "./Board/promotion";
import Modal from "./Modal";
import { isPromotion } from "./common/chess-utilities";

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
  const boardWidth = 800;

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
    dispatch({ type: types.INIT_BOARD, dispatch, boardWidth });
    // replay(moves, 1500, dispatch, boardWidth, orientation);
  }, []);

  /**
   * The Fn is called when the user starts to drag a chess piece.
   * It populates the starting square, the color of the person making the move
   * and the type of piece moved into the MoveDrag state object.
   *
   * @param {*} square
   * @param {*} color
   * @param {*} type
   */
  function dragStart(square, color, type, restrict) {
    if (!restrict.includes(color)) {
      dispatch({ type: types.DRAGSTART, square });
      setMoveDrag({ start: square, color, type });
    }
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

    if (!isPromotion(rowNumber, color, type, start, square, state.chess)) {
      dispatch({ type: types.MOVE, from: start, to: square });
    } else {
      setMoveDrag({ ...moveDrag, to: square });
      setShowPromotionUI(true);
    }
  }

  function clearHighlight() {
    dispatch({ type: types.CLEARHIGHLIGHT });
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

  return (
    <ChessContext.Provider
      value={{
        dragStart,
        drop,
        clearHighlight,
        replayInProgress: state.replayInProgress
      }}
    >
      <Container>
        <TableBackground>
          <Board
            width={boardWidth}
            config={{
              showSquareLetters: true,
              orientation: state.orientation,
              showMoveHighlights: true
            }}
            position={state.board}
            lastMoveStatus={state.lastMoveStatus}
            animatePiece={state.animatePiece}
            turn={state.chess.turn}
            restrict={[state.restrict]}
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
