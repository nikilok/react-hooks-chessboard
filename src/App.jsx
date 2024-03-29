import { useReducer, useEffect } from 'react'
import lobbyReducer from './reducer/lobbyreducer'
import * as types from './reducer/constants'
import Game from './Game.jsx'
import Lobby from './Lobby.jsx'

function App() {
  const [lobbyState, dispatch] = useReducer(lobbyReducer, {
    gameID: undefined,
    orientation: undefined,
    isLoading: undefined,
    fingerprint: undefined,
  })

  useEffect(() => {
    dispatch({ type: types.CHECK_RESUME_GAME, dispatch })
  }, [])

  function quickPlay() {
    dispatch({
      type: types.QUICK_PLAY,
      dispatch,
    })
  }

  function leaveGame() {
    dispatch({ type: types.LEAVEGAME, dispatch })
  }

  if (lobbyState.gameID) {
    return (
      <Game
        gameID={lobbyState.gameID}
        orientation={lobbyState.orientation}
        history={lobbyState.history}
        fen={lobbyState.fen}
        leaveGameHandler={leaveGame}
      />
    )
  }

  return (
    <Lobby
      quickPlayHandler={quickPlay}
      isLoading={lobbyState.isLoading}
      onGoingGame={lobbyState.onGoingGame}
    />
  )
}

export default App
