import React from 'react'
import styled from 'styled-components'

const LeaveGame = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

function GameInfo({ orientation, turn, leaveGameHandler }) {
  return (
    <React.Fragment>
      <h1>{turn() === orientation ? 'Your' : 'Opponents'} turn now</h1>
      <LeaveGame onClick={leaveGameHandler}>
        <h3>Leave game</h3>
      </LeaveGame>
    </React.Fragment>
  )
}

export default GameInfo
