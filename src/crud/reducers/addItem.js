import { obj } from 'the-utils'
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_ERROR,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [ADD_ITEM_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [ADD_ITEM_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [ADD_ITEM_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
