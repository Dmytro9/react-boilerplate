import { obj } from 'the-utils'
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from '../actions/consts'

const initialState = {
  data: '',
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [FETCH_DATA_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [FETCH_DATA_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [FETCH_DATA_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload !== null ? action.payload : '',
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
