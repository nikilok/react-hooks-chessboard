import React from "react";
import styled from "styled-components";
import * as ImageSet from "../icons/modern";

const Piece = styled.img`
  width: ${props => props.width};
`;

/**
 * Icon Component renders a chess piece image, given the type, color and width
 *
 * @param {*} { type, color, width }
 * @returns
 */
function Icon({ type, color, width }) {
  const imgSrc = type && getPieceImg(type, color);

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
  return <Piece width={width} src={imgSrc} />;
}

export default Icon;
