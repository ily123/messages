import { csrfFetch } from './csrf'

const INITIALIZE = 'workspace/initialize'
const ADD_SERVER = 'workspace/add'

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
    default: {
      return state
    }
  }
}
