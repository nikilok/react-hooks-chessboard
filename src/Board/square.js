import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../common/default-theme";

const SquareBlock = styled.div`
  font-size: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor === 0 ? COLORS.WHITESQUARE : COLORS.BLACKSQUARE};
`;

function Square({ backgroundColor, children }) {
  return (
    <SquareBlock backgroundColor={backgroundColor}>{children}</SquareBlock>
  );
}

export default Square;
