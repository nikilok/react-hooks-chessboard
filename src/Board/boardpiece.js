import React, { useEffect, useState } from "react";
import { COLORS } from "../common/default-theme";
import styled from "styled-components";
import wp from "../icons/classic/wp.png";
import bp from "../icons/classic/bp.webp";
import bb from "../icons/classic/bb.webp";
import wb from "../icons/classic/wb.png";
import bk from "../icons/classic/bk.png";
import wk from "../icons/classic/wk.png";
import bn from "../icons/classic/bn.webp";
import wn from "../icons/classic/wn.webp";
import bq from "../icons/classic/bq.png";
import wq from "../icons/classic/wq.webp";
import wr from "../icons/classic/wr.webp";
import br from "../icons/classic/br.png";

const Container = styled.div`
  ${props => `
  ${
    props.color
      ? `
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props.color}
  `
      : ""
  }
  `};
`;

const SquareHighlight = styled.div``;

const Piece = styled.img`
  width: ${props => props.width};
`;

function BoardPiece({
  square,
  type,
  color,
  squareWidth,
  lastMoveStatus = { from: "", to: "" }
}) {
  function getPieceImg(type, color) {
    switch (color + type) {
      case "wp":
        return wp;
      case "bp":
        return bp;
      case "bb":
        return bb;
      case "wb":
        return wb;
      case "bk":
        return bk;
      case "wk":
        return wk;
      case "bn":
        return bn;
      case "wn":
        return wn;
      case "bq":
        return bq;
      case "wq":
        return wq;
      case "wr":
        return wr;
      case "br":
        return br;
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
