import { csrfFetch } from './csrf'

const INITIALIZE = 'workspace/initialize'

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

const initialState = null
export const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE: {
      return action.workspaces
    }
    default: {
      return state
    }
  }
}
