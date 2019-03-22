import React from "react";
import styled from "styled-components";
import Square from "./square";
import BoardPiece from "./boardpiece";

const BoardContainer = styled.div`
  position: relative;
`;
const ChessBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(8, ${props => props.width});
  grid-template-rows: repeat(8, ${props => props.width});
  border: 4px solid #13161b;
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

function Board({
  position,
  width,
  lastMoveStatus,
  config: { showPadding, showAlphaNumeric, orientation = "w" }
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

  console.log("TCL: Board -> lastMoveStatus", lastMoveStatus);

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
              <BoardPiece
                key={i}
                square={square}
                color={color}
                type={type}
                lastMoveStatus={lastMoveStatus}
                squareWidth={squareWidth}
              />
            );
          }
        )}
      </BoardPiecesGrid>
    </BoardContainer>
  );
}

export default Board;
