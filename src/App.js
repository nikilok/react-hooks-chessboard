import React, { useEffect, useReducer, useState } from "react";
import chessReducer from "./reducer/chessreducer";
import * as types from "./reducer/constants";
import styled from "styled-components";
import Board from "./Board";
import Promotion from "./Board/promotion";

const Container = styled.div`
  text-align: center;
`;

const TableBackground = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [state, dispatch] = useReducer(chessReducer, { board: [] });
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

  // const moveDrag = { start: "", to: "", color: "", type: "" };
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

  useEffect(() => {
    dispatch({ type: types.INIT_BOARD });
    // replay(moves, 2000);
  }, []);

  function dragStart(square, color, type) {
    setMoveDrag({ start: square, color, type });
  }

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

  function isPromotion(rowNumber, color, type, from, to) {
    if (rowNumber === "8" && color === "w" && type === "p") {
      if (isMoveValid(from, to)) {
        return true;
      }
    } else if (rowNumber === "1" && color === "b" && type === "p") {
      if (isMoveValid(from, to)) {
        return true;
      }
    }
    return false;
  }

  function getValidMoves(from) {
    const validMovesVerbose = state.chess.moves({
      square: from,
      verbose: true
    });
    return Array.from(new Set(validMovesVerbose.map(({ to }) => to)));
  }

  function isMoveValid(from, to) {
    return getValidMoves(from).includes(to);
  }

  return (
    <Container>
      <TableBackground>
        <Board
          width="800"
          config={{
            showPadding: true,
            showSquareLetters: true,
            orientation: "w",
            showMoveHighlights: true
          }}
          position={state.board}
          lastMoveStatus={state.lastMoveStatus}
          drag={dragStart}
          drop={drop}
        />
      </TableBackground>

      {showPromotionUI && (
        <Promotion color={moveDrag.color} promotionHandler={promotionHandler} />
      )}
    </Container>
  );
}

export default App;
