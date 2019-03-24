import React, { useContext } from "react";
import { COLORS } from "../common/modern-theme";
import styled from "styled-components";
import * as ImageSet from "../icons/modern";
import ChessContext from "../context";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
`;

const Piece = styled.img`
  width: 80%;
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
 *   lastMoveStatus = { from: "", to: "" }
 *   showMoveHighlights (true | false)
 * }
 * @returns
 */
function BoardPiece({
  square,
  type,
  color,
  lastMoveStatus = { from: "", to: "" },
  showMoveHighlights
}) {
  const { dragStart: drag, drop } = useContext(ChessContext);
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
        return ImageSet.WhitePawn;
      case "bp":
        return ImageSet.BlackPawn;
      case "bb":
        return ImageSet.BlackBishop;
      case "wb":
        return ImageSet.WhiteBishop;
      case "bk":
        return ImageSet.BlackKing;
      case "wk":
        return ImageSet.WhiteKing;
      case "bn":
        return ImageSet.BlackKnight;
      case "wn":
        return ImageSet.WhiteKnight;
      case "bq":
        return ImageSet.BlackQueen;
      case "wq":
        return ImageSet.WhiteQueen;
      case "wr":
        return ImageSet.WhiteRook;
      case "br":
        return ImageSet.BlackRook;
      default:
        return;
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

  let squareHighlightColor = "";
  if (showMoveHighlights) {
    if (from === square) {
      squareHighlightColor = COLORS.MOVEFROM;
    } else if (to === square) {
      squareHighlightColor = COLORS.MOVETO;
    } else {
      squareHighlightColor = undefined;
    }
  }

  const PieceContainer = type && (
    <Piece
      src={imgSrc}
      draggable={true}
      onDragStart={() => drag(square, color, type)}
    />
  );
  return (
    <Container
      onClick={clickHandle}
      color={squareHighlightColor}
      onDrop={() => drop(square)}
      onDragOver={event => event.preventDefault()}
    >
      {PieceContainer}
    </Container>
  );
}

export default BoardPiece;
