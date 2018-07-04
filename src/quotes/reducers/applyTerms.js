import { obj } from 'the-utils'
import {
  REQUEST_TERMS_START,
  REQUEST_TERMS_FULFILLED,
  REQUEST_TERMS_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  html: '',
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_TERMS_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [REQUEST_TERMS_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [REQUEST_TERMS_FULFILLED]: (state, action) => ({
    ...state,
    isLoading: false,
    html: action.payload !== null ? action.payload.data : '',
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
