import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Icon from "./icon";
import { COLORS } from "../common/modern-theme";

const IconContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.width};
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  border: 4px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.type === "n"
      ? css`
          transition: left ${props.delay}s ease, top ${props.delay}s ease-in;
        `
      : css`
          transition: ${props.delay}s ease;
        `}
`;

/** The SquareEraser styled component places an empty square above the chess piece to
 * give the illusion of it being animated to a new location. This is only in place during
 * the animation phase after which both the animated piece and eraser are removed from
 * the DOM, as it's states are invalidated by the chessreducer's MOVE action type.
 */
const SquareEraser = styled.div`
  position: absolute;
  margin: 4px;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  width: ${props => props.width};
  height: ${props => props.width};
  background-color: ${props =>
    props.color === "light" ? COLORS.WHITESQUARE : COLORS.BLACKSQUARE};
`;

/**
 * AnimatePiece Component animates a chess piece requested by the replay Fn.
 * It animates the piece from the "from" coordinates to the "to" coordinates.
 *
 * @param {*} {
 *   animate: { color, type, from, to, squareColor, animationDelay },
 *   width
 * }
 * @returns
 */
function AnimatePiece({
  animate: { color, type, from, to, squareColor, animationDelay },
  width
}) {
  const [pieceX, setPieceX] = useState(from.x);
  const [pieceY, setPieceY] = useState(from.y);

  useEffect(() => {
    setPieceX(to.x);
    setPieceY(to.y);
  }, [from, to]);

  return (
    <React.Fragment>
      <SquareEraser
        color={squareColor}
        width={width}
        top={from.y}
        left={from.x}
      />
      <IconContainer
        width={width}
        top={pieceY}
        left={pieceX}
        delay={animationDelay / 1000}
        type={type}
      >
        <Icon width="80%" color={color} type={type} />
      </IconContainer>
    </React.Fragment>
  );
}

export default AnimatePiece;
