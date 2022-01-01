import { csrfFetch } from './csrf'

const LOAD_MESSAGES = 'message/init'
const ADD_MESSAGE = 'message/add'
const REMOVE_MESSAGE = 'message/delete'

const loadMessages = messages => {
  return {
    type: LOAD_MESSAGES,
    messages
  }
}
export const getMessagesRequest = channelId => async dispatch => {
  const response = await csrfFetch(`/api/channel/${channelId}`)
  if (response.ok) {
    const data = await response.json()
    dispatch(loadMessages(data))
  }
  return true
}

export const addMessage = (message, user) => {
  return {
    type: ADD_MESSAGE,
    message,
    user
  }
}
export const postMessageRequest = (channelId, content) => async dispatch => {
  console.log('got thuink')
  const isLoaded = true
  const response = await csrfFetch(`/api/channel/${channelId}/message`, {
    method: 'POST',
    body: JSON.stringify({ content })
  })
  if (response.ok) {
    const { message, user } = await response.json()
    // message is added via socket
    // dispatch(addMessage(message, user))
    return isLoaded
  }
  return !isLoaded
}

const initialState = { Messages: [], Users: [] }
export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES: {
      return action.messages
    }
    case ADD_MESSAGE: {
      const newState = { ...state }
      newState.Messages.push(action.message)
      const userIds = newState.Users.map(user => user.id)
      if (!userIds.includes(action.user.id)) {
        newState.Users.push(action.user)
      }
      return newState
    }
    case REMOVE_MESSAGE: {
      const newState = [...state]
      // delete newState[action.serverId]
      return newState
    }
    default: {
      return state
    }
  }
}
