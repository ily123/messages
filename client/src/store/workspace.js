import { csrfFetch } from './csrf'

const INITIALIZE = 'workspace/initialize'

const initialize = workspaces => {
  return {
    type: INITIALIZE,
    workspaces
  }
}

export const loadWorkspaces = () => async dispatch => {
  const response = await csrfFetch('/api/server')
  const data = await response.json()
  dispatch(initialize(data))
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
