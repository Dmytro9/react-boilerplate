import { obj } from 'the-utils'
import uuidv4 from 'uuid/v4'
import {
  DELETE_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS,
  ADD_ITEM_SUCCESS,
  CLEAR_NOTIFICATION,
  GET_ITEM_SUCCESS,
} from '../actions/consts'

const initialState = {
  data: '',
  isLoading: false,
  messages: [],
}

export const actionHandlers = {
  [DELETE_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [...state.messages, ...action.payload.map(m => ({
      ...m,
      id: uuidv4(),
    }))],
  }),
  [ADD_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [...state.messages, ...action.payload.map(m => ({
      ...m,
      id: uuidv4(),
    }))],
  }),
  [EDIT_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [...state.messages, ...action.payload.map(m => ({
      ...m,
      id: uuidv4(),
    }))],
  }),
  [GET_ITEM_SUCCESS]: (state, action) => {
    const messages = action.payload.notifications !== undefined ? action.payload.notifications : []
    return ({
      ...state,
      isLoading: false,
      messages: [...state.messages, ...messages.map(m => ({
        ...m,
        id: uuidv4(),
      }))],
    })
  },
  [CLEAR_NOTIFICATION]: (state, action) => ({
    ...state,
    isLoading: false,
    messages: [...state.messages.filter(m => m.id !== action.payload)],
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
