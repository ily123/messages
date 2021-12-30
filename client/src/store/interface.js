const RESET = 'uicontrols/reset'
const SET_SERVER_SETTINGS_VISIBILITY = 'uicontrols/setServerSettingsShow'

export const resetUI = () => {
  return { type: RESET }
}
export const setServerSettingsShow = isShown => {
  return {
    type: SET_SERVER_SETTINGS_VISIBILITY,
    isShown
  }
}

const initialState = {
  serverSettings: {
    isShown: false
  }
}
export const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET: {
      const state = {
        serverSettings: {
          isShown: false
        }
      }
      return state
    }
    case SET_SERVER_SETTINGS_VISIBILITY: {
      const newState = { ...state }
      newState.serverSettings.isShown = action.isShown
      return newState
    }
    default: {
      return state
    }
  }
}
