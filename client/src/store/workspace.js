import { csrfFetch } from './csrf'

const INITIALIZE = 'server/initialize'
const ADD_SERVER = 'server/add'
const REMOVE_SERVER = 'server/delete'

const initialize = workspaces => {
  return {
    type: INITIALIZE,
    workspaces
  }
}

export const loadWorkspaces = () => async dispatch => {
  const isLoaded = true
  const response = await csrfFetch('/api/server')
  if (response.ok) {
    const data = await response.json()
    dispatch(initialize(data))
    return isLoaded
  }
  return !isLoaded
}

const addServer = server => {
  return {
    type: ADD_SERVER,
    server
  }
}

export const postServerRequest = title => async dispatch => {
  const isLoaded = true
  const response = await csrfFetch('/api/server', {
    method: 'POST',
    body: JSON.stringify({ title })
  })
  if (response.ok) {
    const { server } = await response.json()
    dispatch(addServer(server))
    return { isLoaded, server }
  }
  return !isLoaded
}

const removeServer = (serverId) => {
  return {
    type: REMOVE_SERVER,
    serverId
  }
}

export const deleteServerRequest = serverId => async dispatch => {
  const isLoaded = true
  const response = await csrfFetch(`/api/server/${serverId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const { success } = await response.json()
    console.log(success)
    dispatch(removeServer(serverId))
    return isLoaded
  }
  return !isLoaded
}

export const patchServerRequest = (serverId, title) => async dispatch => {
  const isLoaded = true
  const response = await csrfFetch(`/api/server/${serverId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title })
  })
  if (response.ok) {
    const { server } = await response.json()
    dispatch(addServer(server))
    return isLoaded
  }
  return !isLoaded
}

const initialState = null
export const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE: {
      return action.workspaces
    }
    case ADD_SERVER: {
      const newState = { ...state }
      newState[action.server.id] = action.server
      return newState
    }
    case REMOVE_SERVER: {
      const newState = { ...state }
      delete newState[action.serverId]
      return newState
    }
    default: {
      return state
    }
  }
}
