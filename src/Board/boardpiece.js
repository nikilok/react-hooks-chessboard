import React from "react";
import { COLORS } from "../common/default-theme";
import styled from "styled-components";
import BlackBishop from "../icons/classic/bb.webp";
import BlackKing from "../icons/classic/bk.png";
import BlackKnight from "../icons/classic/bn.webp";
import BlackPawn from "../icons/classic/bp.webp";
import BlackQueen from "../icons/classic/bq.png";
import BlackRook from "../icons/classic/br.png";
import WhiteBishop from "../icons/classic/wb.png";
import WhiteKing from "../icons/classic/wk.png";
import WhiteKnight from "../icons/classic/wn.webp";
import WhitePawn from "../icons/classic/wp.png";
import WhiteQueen from "../icons/classic/wq.webp";
import WhiteRook from "../icons/classic/wr.webp";

const Container = styled.div`
  ${props => `
  ${
    props.color
      ? `
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props.color};
  width: 100%;
  height: 100%;
  `
      : ""
  }
  `};
`;

const SquareHighlight = styled.div``;

const Piece = styled.img`
  width: ${props => props.width};
`;
/**
 * BoardPiece Component is responsible for rendering the Chess pieces,
 * along with the square from and to highlight colors.
 * It imports all the images for the chess pieces and inlines it.
 *
 * @param {*} {
 *   square,
 *   type,
 *   color,
 *   squareWidth,
 *   lastMoveStatus = { from: "", to: "" }
 * }
 * @returns
 */
function BoardPiece({
  square,
  type,
  color,
  squareWidth,
  lastMoveStatus = { from: "", to: "" }
}) {
  /**
   * getPieceImg Fn returns back the Image given the type Notation and color
   * of the piece.
   *
   * @param {*} type ( p - Pawn , n - Knight , r - Rook  , b - Bishop , k - King , q - Queen )
   * @param {*} color ( b - Black ,  w - White )
   * @returns (An Image reference that can be put the img src)
   */
  function getPieceImg(type, color) {
    switch (color + type) {
      case "wp":
        return WhitePawn;
      case "bp":
        return BlackPawn;
      case "bb":
        return BlackBishop;
      case "wb":
        return WhiteBishop;
      case "bk":
        return BlackKing;
      case "wk":
        return WhiteKing;
      case "bn":
        return BlackKnight;
      case "wn":
        return WhiteKnight;
      case "bq":
        return BlackQueen;
      case "wq":
        return WhiteQueen;
      case "wr":
        return WhiteRook;
      case "br":
        return BlackRook;
    }
  }
  function clickHandle() {
    console.log("square", square);
    console.log("color", color);
    console.log("type", color === "w" ? type.toUpperCase() : type);
    console.log("-------");
  }

  const imgSrc = type && getPieceImg(type, color);
  const { from, to } = lastMoveStatus;

  let squareHighlightColor;
  if (from === square) {
    squareHighlightColor = COLORS.MOVEFROM;
  } else if (to === square) {
    squareHighlightColor = COLORS.MOVETO;
  } else {
    squareHighlightColor = undefined;
  }

  const PieceContainer = type && <Piece width={squareWidth} src={imgSrc} />;
  return (
    <Container onClick={clickHandle} color={squareHighlightColor}>
      {PieceContainer}
    </Container>
  );
}

export default BoardPiece;
