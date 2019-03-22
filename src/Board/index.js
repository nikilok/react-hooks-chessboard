import React from "react";
import styled from "styled-components";
import Square from "./square";
import BoardPiece from "./boardpiece";
import Annotation from "./annotation";
import { COLORS } from "../common/default-theme";

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
 * config -
 *  orientation - 'b - Black, w - White' shows the boards orientation for black or white
 *
 * @param {*} {
 *   position,
 *   width,
 *   lastMoveStatus,
 *   config: { showPadding, showAlphaNumeric, orientation = "w" }
 * }
 * @returns
 */
function Board({
  position,
  width,
  lastMoveStatus,
  config: { showPadding, showSquareLetters, orientation = "w" }
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

  return (
    <BoardContainer>
      <ChessBoard width={squareWidth}>
        {boardColorPattern.map((color, i) => {
          return <Square key={i} backgroundColor={color} />;
        })}
      </ChessBoard>

      <BoardPiecesGrid width={squareWidth}>
        {(orientation === "w" ? position : position.reverse()).map(
          ({ type, color, square }, i) => {
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
                  lastMoveStatus={lastMoveStatus}
                  squareWidth={squareWidth}
                />
              </SquareContainer>
            );
          }
        )}
      </BoardPiecesGrid>
    </BoardContainer>
  );
}

export default Board;
