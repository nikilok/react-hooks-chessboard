import React, { useEffect, useReducer, useState } from "react";
import { COLORS } from "./common/modern-theme";
import useBoardSize from "./common/boardSizeHook";
import ChessContext from "./context";
import chessReducer from "./reducer/chessreducer";
import * as types from "./reducer/constants";
import styled from "styled-components";
import Board from "./Board";
import Promotion from "./Board/promotion";
import Modal from "./Modal";
import GameInfo from "./GameInfo";
import { isPromotion } from "./common/chess-utilities";
import socket from "./common/socket";

const Container = styled.div`
  text-align: center;
  background-color: white;
  display: grid;
  grid-template-areas:
    "boardarea"
    "infoarea";
  flex-direction: column;
  align-items: flex-start;
`;

const TableBackground = styled.div`
  grid-area: boardarea;
  background-color: ${COLORS.TABLEBACKGROUND};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GameInfoArea = styled.div`
  grid-area: infoarea;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  margin: auto;
  padding: 10px 95px 10px 95px;
  background-color: white;
`;

/**
 * The Game component handles everything about the game experience.
 * It has the chess board, and all other UI elements required for the game experience.
 * @param {gameID}
 */
function Game({ gameID, orientation, history, fen, leaveGameHandler }) {
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
  const boardWidth = useBoardSize(97);

  useEffect(() => {
    dispatch({
      type: types.INIT_BOARD,
      dispatch,
      orientation,
      gameID,
      fen,
      history
    });

    return () => {
      /* Component unmount cleanup events */
      socket.removeAllListeners();
      dispatch({ type: types.RESET_GAME_REDUCER });
    };
  }, [gameID]);

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

      <GameInfoArea>
        <GameInfo
          turn={state.chess.turn}
          orientation={state.orientation}
          leaveGameHandler={leaveGameHandler}
        />
      </GameInfoArea>
    </ChessContext.Provider>
  );
}

export default Game;
