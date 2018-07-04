import { obj } from 'the-utils'
import {
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_ERROR,
} from '../actions/consts'

const initialState = {
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [EDIT_ITEM_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [EDIT_ITEM_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [EDIT_ITEM_SUCCESS]: state => ({
    ...state,
    isLoading: false,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
