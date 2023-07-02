import * as types from './constants'
import * as CONSTANT from '../common/appConstant'
import socket from '../common/socket'
import * as url from '../config.json'
import { getFingerprint } from '../common/chess-utilities'
import { Store } from 'react-notifications-component'

function lobbyReducer(state, action) {
  switch (action.type) {
    case types.CHECK_RESUME_GAME:
      getFingerprint().then((fingerprint) => {
        fetch(`${url.serviceUrl}/gamestatus/${fingerprint}`)
          .then((response) => response.json())
          .then(({ status }) => {
            action.dispatch({ type: types.RESUME_UPDATE, status })
          })
      })
    case types.RESUME_UPDATE:
      return { ...state, onGoingGame: action.status }
    case types.QUICK_PLAY:
      action.dispatch({
        type: types.SEARCHING,
      })
      getFingerprint().then((fingerprint) => {
        socket.emit('subscribe', fingerprint)
        socket.emit('getGameKey', fingerprint)
      })

      socket.on(
        'getGameKey',
        ({ id: gameID, colorAllocated, clientKey, history, fen }) => {
          // Leave the original room with browser fingerprint, so you no longer listen for new game keys
          socket.emit('unsubscribe', clientKey)
          // Subscribe to the new game room
          socket.emit('subscribe', gameID)
          socket.emit('isGameReady', gameID)
          socket.on('isGameReady', (isGameReady) => {
            const ready = isGameReady.player2Available
            if (ready) {
              action.dispatch({
                type: types.STARTGAME,
                gameID,
                colorAllocated,
                history,
                fen,
                clientKey,
              })
            }
          })
        }
      )

      socket.on('leaveGame', ({ leaveGame, gameID }) => {
        if (leaveGame) {
          socket.emit('unsubscribe', gameID)
          Store.addNotification({
            title: CONSTANT.GAME_LEAVE_TITLE,
            type: 'danger',
            message: CONSTANT.GAME_LEAVE_MSG,
            duration: 4000,
          })
          /* 5 seconds before exiting the user out to the lobby */
          setTimeout(() => {
            action.dispatch({ type: types.EXIT_TO_LOBBY })
          }, 5000)
        }
      })

      socket.on('terminateGame', ({ leaveGame, gameID }) => {
        if (leaveGame) {
          socket.emit('unsubscribe', gameID)
          Store.addNotification({
            title: CONSTANT.GAME_LEAVE_TITLE,
            type: 'danger',
            message: CONSTANT.GAME_TERMINATE_MSG,
            duration: 4000,
          })
          /* 5 seconds before exiting the user out to the lobby */
          setTimeout(() => {
            action.dispatch({ type: types.EXIT_TO_LOBBY })
          }, 5000)
        }
      })

      socket.on('playerDisconnect', ({ status }) => {
        if (status) {
          Store.addNotification({
            title: CONSTANT.PLAYER_DISCONNECT_TITLE,
            type: 'warning',
            message: CONSTANT.PLAYER_DISCONNECT_MESSAGE,
            duration: 10000,
          })
        }
      })

      socket.on('playerReconnected', (status) => {
        if (status) {
          Store.addNotification({
            title: CONSTANT.PLAYER_RECONNECTED_TITLE,
            message: CONSTANT.PLAYER_RECONNECTED_MESSAGE,
          })
        }
      })

      socket.on('disconnect', () => {
        Store.addNotification({
          title: CONSTANT.PLAYER_I_DISCONNECTED_TITLE,
          message: CONSTANT.PLAYER_I_DISCONNECTED_MSG,
          type: 'danger',
          duration: 5000,
        })
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      })

    case types.STARTGAME:
      return {
        ...state,
        gameID: action.gameID,
        orientation: action.colorAllocated,
        history: action.history || [],
        fen: action.fen,
        fingerprint: action.clientKey,
        isLoading: false,
      }

    case types.SEARCHING:
      return {
        ...state,
        isLoading: true,
      }

    case types.LEAVEGAME:
      socket.emit('leaveGame', state.fingerprint, state.gameID)

    case types.EXIT_TO_LOBBY:
      return {
        gameID: undefined,
        orientation: undefined,
        isLoading: undefined,
        fingerprint: undefined,
      }
    default:
      return state
  }
}

export default lobbyReducer
