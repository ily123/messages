import { csrfFetch } from './csrf'

const INITIALIZE = 'server/initialize'
const ADD_SERVER = 'server/add'
const REMOVE_SERVER = 'server/delete'
const ADD_CHANNEL = 'channel/add'
const PATCH_CHANNEL = 'channel/patch'
const DELETE_CHANNEL = 'channel/delete'

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
    console.log('SERVER DELETE')
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

export const putServerRequest = (serverId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/server/${serverId}`, {
      method: 'PUT',
      body: JSON.stringify({ serverId })
    })
    if (response.ok) {
      const { server } = await response.json()
      dispatch(addServer(server))
      return { server }
    }
  } catch (error) {
    return { server: null }
  }
}

const addChannel = (channel) => {
  return {
    type: ADD_CHANNEL,
    channel
  }
}

export const postChannelRequest = (serverId, title) => async dispatch => {
  try {
    const response = await csrfFetch('/api/channel', {
      method: 'POST',
      body: JSON.stringify({ serverId, title })
    })
    if (response.ok) {
      const { channel } = await response.json()
      dispatch(addChannel(channel))
      return { channel }
    }
  } catch (error) {
    return { channel: null }
  }
}

const patchChannel = (channel) => {
  return {
    type: PATCH_CHANNEL,
    channel
  }
}

export const patchChannelRequest = (channelId, title) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/channel/${channelId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title })
    })
    if (response.ok) {
      const { channel } = await response.json()
      dispatch(patchChannel(channel))
      return { channel }
    }
  } catch (error) {
    return { channel: null }
  }
}

const deleteChannel = (channel) => {
  return {
    type: DELETE_CHANNEL,
    channel
  }
}

export const deleteChannelRequest = (channelId) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/channel/${channelId}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      const { channel } = await response.json()
      dispatch(deleteChannel(channel))
      return { channel }
    }
  } catch (error) {
    return { channel: null }
  }
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
    case ADD_CHANNEL: {
      let { server_id: serverId } = action.channel
      serverId = String(serverId)
      const newState = { ...state }
      if (Object.keys(newState).includes(serverId)) {
        newState[serverId].Channels?.push(action.channel)
      }
      return newState
    }
    case PATCH_CHANNEL: {
      // this is a bit convoluted
      // the channels are stored in an array, not an object
      // and at this point, I am wary of rewriting it
      // so then, here, we find the relevant channl in the array
      // and replace it with the new version sent by the backend
      const { id, server_id: serverId } = action.channel
      const newState = { ...state }
      const channelIndex = newState[String(serverId)].Channels.map(ch => ch.id).indexOf(id)
      newState[serverId].Channels[channelIndex] = action.channel
      return newState
    }
    case DELETE_CHANNEL: {
      const { id, server_id: serverId } = action.channel
      console.log(action.channel)
      const newState = { ...state }
      const channelIndex = newState[String(serverId)].Channels.map(ch => ch.id).indexOf(id)
      delete newState[serverId].Channels[channelIndex]
      return newState
    }
    default: {
      return state
    }
  }
}
