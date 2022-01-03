import { csrfFetch } from './csrf'

const LOAD_MESSAGES = 'message/init'
const ADD_MESSAGE = 'message/add'
const REMOVE_MESSAGE = 'message/delete'
const UPDATE_MESSAGE = 'message/update'

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

export const updateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    message
  }
}
export const patchMessageRequest = (messageId, content) => async dispatch => {
  console.log('got thuink', content)
  const isLoaded = true
  const response = await csrfFetch(`/api/channel/message/${messageId}`, {
    method: 'PATCH',
    body: JSON.stringify({ content })
  })
  if (response.ok) {
    const { message } = await response.json()
    // message is added via socket
    // dispatch(updateMessage(message))
    return isLoaded
  }
  return !isLoaded
}

export const deleteMessage = (message) => {
  return {
    type: REMOVE_MESSAGE,
    message
  }
}
export const deleteMessageRequest = (messageId) => async dispatch => {
  const isLoaded = true
  const response = await csrfFetch(`/api/channel/message/${messageId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const { message } = await response.json()
    console.log(message)
    // message is handled via socket
    // dispatch(deleteMessage(message))
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
      const newState = { ...state }
      const messageIndex = newState.Messages.map(msg => msg.id).indexOf(action.message.id)
      delete newState.Messages[messageIndex]
      return newState
    }
    case UPDATE_MESSAGE: {
      const newState = { ...state }
      const messageIndex = newState.Messages.map(msg => msg.id).indexOf(action.message.id)
      newState.Messages[messageIndex] = action.message
      return newState
    }
    default: {
      return state
    }
  }
}
