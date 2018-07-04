import { obj } from 'the-utils'
import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
  notifications: [],
}

export const actionHandlers = {
  [DELETE_ITEM_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [DELETE_ITEM_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [DELETE_ITEM_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
