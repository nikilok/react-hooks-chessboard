import React from "react";
import styled from "styled-components";
import Square from "./square";
import BoardPiece from "./boardpiece";
import Annotation from "./annotation";
import AnimatePiece from "./animatepiece";
import { COLORS } from "../common/modern-theme";

const BoardContainer = styled.div`
  position: relative;
`;

const ChessBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(8, ${props => props.width});
  grid-template-rows: repeat(8, ${props => props.width});
  border: 4px solid ${COLORS.BOARDBORDER};
`;

const BoardPiecesGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(8, ${props => props.width});
  grid-template-rows: repeat(8, ${props => props.width});
  border: 4px solid transparent;
`;

const SquareContainer = styled.div`
  position: relative;
`;
/**
 * Board Component, renders a chess board.
 * position - takes in an array of moves representing the board.
 * width - takes in a number that represents the width of the board.
 * lastMoveStatus - has the status of the last move.
 * turn - Fn that returns whose turn it is (w - for White, b - for Black)
 * restrict - Recieves an Array of colors you want to restrict player from moving .
 *  ['w','b'] restricts both white and black players from moving.
 * config -
 *  orientation - 'b - Black, w - White, auto - Auto' changes the orientation of the board
 *
 * @param {*} {
 *   position,
 *   width,
 *   lastMoveStatus,
 *   restrict,
 *   config: { showPadding, showAlphaNumeric, orientation = "w" }
 * }
 * @returns
 */
function Board({
  position,
  width,
  lastMoveStatus,
  turn,
  animatePiece,
  restrict,
  config: {
    showSquareLetters = true,
    orientation = "auto",
    showMoveHighlights = true
  }
}) {
  const squareWidth = `${width / 8}px`;
  // prettier-ignore
  const boardColorPattern = [
                            0, 1, 0, 1, 0, 1, 0, 1, 
                            1, 0, 1, 0, 1, 0, 1, 0, 
                            0, 1, 0, 1, 0, 1, 0, 1, 
                            1, 0, 1, 0, 1, 0, 1, 0, 
                            0, 1, 0, 1, 0, 1, 0, 1, 
                            1, 0, 1, 0, 1, 0, 1, 0, 
                            0, 1, 0, 1, 0, 1, 0, 1, 
                            1, 0, 1, 0, 1, 0, 1, 0
                          ];

  /**
   * getPosition Fn returns the position array based on the orientation.
   * When in auto orientation it figures out whose turn it is currently
   * and returns the position array based on it.
   *
   * @param {*} orientation
   * @returns
   */
  function getPosition(orientation) {
    const reversedPosition = [...position].reverse();
    switch (orientation) {
      case "w":
        return position;
      case "b":
        return reversedPosition;
      case "auto":
        return turn() === "w" ? position : reversedPosition;
      default:
        return position;
    }
  }
  return (
    <BoardContainer>
      <ChessBoard width={squareWidth}>
        {boardColorPattern.map((color, i) => {
          return <Square key={i} backgroundColor={color} />;
        })}
      </ChessBoard>

      <BoardPiecesGrid width={squareWidth}>
        {getPosition(orientation).map(({ type, color, square }, i) => {
          return (
            <SquareContainer key={i}>
              {i % 8 === 0 && showSquareLetters && (
                <Annotation square={square} align="left" />
              )}
              {i >= 56 && showSquareLetters && (
                <Annotation square={square} align="bottom" />
              )}

              <BoardPiece
                square={square}
                color={color}
                type={type}
                turn={turn}
                lastMoveStatus={lastMoveStatus}
                showMoveHighlights={showMoveHighlights}
                restrict={restrict}
              />
            </SquareContainer>
          );
        })}
      </BoardPiecesGrid>

      {animatePiece && (
        <AnimatePiece animate={animatePiece} width={squareWidth} />
      )}
    </BoardContainer>
  );
}

export default Board;
