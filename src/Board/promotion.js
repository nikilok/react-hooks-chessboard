import React from "react";
import styled from "styled-components";
import { COLORS } from "../common/modern-theme";
import * as ImageSet from "../icons/modern";
import Modal from "../Modal";

const Piece = styled.img`
  width: 120px;
  border: 4px solid transparent;
  &:hover {
    background-color: ${COLORS.MOVETO};
    border: 4px solid ${COLORS.BOARDBORDER};
    border-radius: 10px;
    cursor: pointer;
  }
`;

/**
 * Promotion component shows the promotion UI allowing the user to make a
 * choice, on what he likes to promote to
 *
 * @param {*} { color, promotionHandler }
 * @returns
 */
function Promotion({ color, promotionHandler }) {
  console.log("TCL: Promotion -> color", color);
  const promotionPieces = ["q", "b", "n", "r"];

  function getPieceImg(type, color) {
    switch (color + type) {
      case "bb":
        return ImageSet.BlackBishop;
      case "wb":
        return ImageSet.WhiteBishop;
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

  const PromotionList = promotionPieces.map(pieceNotation => {
    const imgSrc = getPieceImg(pieceNotation, color);
    return (
      <Piece
        key={pieceNotation}
        src={imgSrc}
        onClick={() => promotionHandler(pieceNotation)}
      />
    );
  });
  return (
    <Modal title="Please select a piece to promote to">{PromotionList}</Modal>
  );
}

export default Promotion;
