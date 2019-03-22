import React from "react";
import styled from "styled-components";
import { COLORS } from "../common/default-theme";

const CommonAlphabetStyling = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: 1.2em;
  color: ${COLORS.PADDINGFOREGROUND};
  text-transform: uppercase;
  display: flex;
`;

const LeftRender = styled(CommonAlphabetStyling)`
  height: 100%;
  left: -40px;
  align-items: center;
`;

const BottomRender = styled(CommonAlphabetStyling)`
  width: 100%;
  bottom: -40px;
  justify-content: center;
`;

function Annotation({ square, align }) {
  const splitChars = square.split("");
  const charToDisplay =
    align === "left" ? (
      <LeftRender>{splitChars[1]}</LeftRender>
    ) : (
      <BottomRender>{splitChars[0]}</BottomRender>
    );
  return <div>{charToDisplay}</div>;
}

export default Annotation;
