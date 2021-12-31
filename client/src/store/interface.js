const RESET = 'uicontrols/reset'
const SET_SERVER_SETTINGS_VISIBILITY = 'uicontrols/setServerSettingsShow'
const SET_WORKSPACE_MODAL_VISIBILITY = 'uicontrols/setWorkSpaceModalShow'

export const closeAllModals = () => {
  return { type: RESET }
}
export const setServerSettingsShow = isShown => {
  return {
    type: SET_SERVER_SETTINGS_VISIBILITY,
    isShown
  }
}
export const setWorkSpaceModalVisibility = isShown => {
  return {
    type: SET_WORKSPACE_MODAL_VISIBILITY,
    isShown
  }
}

const initialState = {
  serverSettings: {
    isShown: false
  },
  workSpaceModal: {
    isShown: false
  }
}
export const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET: {
      return initialState
    }
    case SET_SERVER_SETTINGS_VISIBILITY: {
      const newState = { ...state }
      newState.serverSettings.isShown = action.isShown
      return newState
    }
    case SET_WORKSPACE_MODAL_VISIBILITY: {
      const newState = { ...state }
      newState.workSpaceModal.isShown = action.isShown
      return newState
    }
    default: {
      return state
    }
  }
}
