import React, { useContext } from "react";
import { COLORS } from "../common/modern-theme";
import styled, { css } from "styled-components";
import ChessContext from "../context/ChessContext";
import Icon from "./icon";

const Container = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.width}px`};
  background-color: ${props => props.color};

  ${props =>
    props.maskPiece &&
    css`
      ${IconContainer} {
        filter: grayscale(100%);
        opacity: 0.4;
      }
    `}
`;

const IconContainer = styled.div`
  transition: all 0.3s;
  touch-action: none;
  transform: translate(0px, 0px);
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.width}px`};
  cursor: ${props => (props.freeToMove ? "grab" : "no-drop")};

  &:active {
    cursor: ${props => props.freeToMove && "grabbing"};
  }
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
 *   turn,
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
  showMoveHighlights,
  restrict,
  turn,
  width
}) {
  const {
    dragStart: drag,
    drop,
    clearHighlight,
    replayInProgress
  } = useContext(ChessContext);

  const restrictArray = [
    ...restrict,
    turn() === "w" ? "b" : "w",
    ...(replayInProgress ? ["w", "b"] : [])
  ];

  function clickHandle() {
    clearHighlight();
  }

  const { from, to, maskIcon } = lastMoveStatus;

  let squareHighlightColor, maskPiece;
  if (showMoveHighlights || maskIcon) {
    if (from === square) {
      squareHighlightColor = COLORS.MOVEFROM;
      if (maskIcon) {
        squareHighlightColor = undefined;
        maskPiece = true;
      }
    } else if (to === square) {
      squareHighlightColor = COLORS.MOVETO;
    }
  }
  const ifFreeToMove = !restrictArray.includes(color);
  const PieceContainer = type && (
    <IconContainer
      draggable={ifFreeToMove}
      freeToMove={ifFreeToMove}
      width={width}
      onDragStart={() => drag(square, color, type, restrictArray)}
    >
      <Icon type={type} color={color} width="80%" />
    </IconContainer>
  );
  return (
    <Container
      onClick={clickHandle}
      color={squareHighlightColor}
      maskPiece={maskPiece}
      onDrop={event => {
        event.preventDefault();
        drop(square);
      }}
      onDragOver={event => event.preventDefault()}
      width={width}
    >
      {PieceContainer}
    </Container>
  );
}

export default BoardPiece;
