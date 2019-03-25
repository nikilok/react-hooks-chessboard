import React from "react";
import styled from "styled-components";
import { COLORS } from "../common/modern-theme";
import Icon from "./icon";
import Modal from "../Modal";

const IconContainer = styled.div`
  display: flex;
`;

const IconHover = styled.div`
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

  const PromotionList = promotionPieces.map(pieceNotation => (
    <IconHover
      key={pieceNotation}
      onClick={() => promotionHandler(pieceNotation)}
    >
      <Icon type={pieceNotation} color={color} width="100%" />
    </IconHover>
  ));
  return (
    <Modal title="Please select a piece to promote to">
      <IconContainer>{PromotionList}</IconContainer>
    </Modal>
  );
}

export default Promotion;
