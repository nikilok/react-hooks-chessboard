import React from "react";
import styled from "styled-components";
import { COLORS } from "../common/default-theme";
import BlackBishop from "../icons/classic/bb.webp";
import BlackKnight from "../icons/classic/bn.webp";
import BlackQueen from "../icons/classic/bq.png";
import BlackRook from "../icons/classic/br.png";
import WhiteBishop from "../icons/classic/wb.png";
import WhiteKnight from "../icons/classic/wn.webp";
import WhiteQueen from "../icons/classic/wq.webp";
import WhiteRook from "../icons/classic/wr.webp";
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
        return BlackBishop;
      case "wb":
        return WhiteBishop;
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
