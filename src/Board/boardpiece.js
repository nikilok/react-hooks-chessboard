import React, { useContext } from "react";
import { COLORS } from "../common/modern-theme";
import styled from "styled-components";
import ChessContext from "../context";
import Icon from "./icon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
`;

const MousePointer = styled.div`
  cursor: ${props =>
    props.restrict.includes(props.color) ? "no-drop" : "grab"};

  &:active {
    cursor: ${props => !props.restrict.includes(props.color) && "grabbing"};
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
  turn
}) {
  const { dragStart: drag, drop, clearHighlight } = useContext(ChessContext);

  function clickHandle() {
    clearHighlight();
  }

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
    <MousePointer
      color={color}
      restrict={[...restrict, turn() === "w" ? "b" : "w"]}
      draggable={true}
      onDragStart={() => drag(square, color, type, restrict)}
    >
      <Icon type={type} color={color} width="80%" />
    </MousePointer>
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
