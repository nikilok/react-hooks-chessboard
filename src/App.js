import React, { useEffect, useReducer } from "react";
import chessReducer from "./reducer/chessreducer";
import * as types from "./reducer/constants";
import styled from "styled-components";
import Board from "./Board";

const Container = styled.div`
  text-align: center;
`;

const TableBackground = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [state, dispatch] = useReducer(chessReducer, { board: new Array() });
  const moves = [
    ["e2", "e4"],
    ["e7", "e5"],
    ["f1", "b5"],
    ["f7", "f6"],
    ["g1", "h3"],
    ["b8", "a6"],
    ["b5", "a6"],
    ["b7", "a6"],
    ["e1", "g1"],
    ["c8", "b7"],
    ["b1", "c3"],
    ["d8", "e7"],
    ["f2", "f3"],
    ["e8", "c8"]
  ];

  function replay(moves, timeout = 1000) {
    const [from, to] = moves.shift();

    setTimeout(() => {
      dispatch({ type: types.MOVE, from, to });
      if (moves.length > 0) {
        replay(moves, timeout);
      }
    }, timeout);
  }

  useEffect(() => {
    dispatch({ type: types.INIT_BOARD });

    replay(moves, 2000);
  }, []);

  return (
    <Container>
      <TableBackground>
        <Board
          width="800"
          config={{
            showPadding: true,
            showAlphaNumeric: true,
            orientation: "b"
          }}
          position={state.board}
          lastMoveStatus={state.lastMoveStatus}
        />
      </TableBackground>
    </Container>
  );
}

export default App;
