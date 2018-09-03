import { obj } from 'the-utils'
import {
  VERIFICATE_CODE_START,
  VERIFICATE_CODE_FULFILLED,
  VERIFICATE_CODE_FAILURE,
  VERIFICATE_CODE_ERROR,
  VERIFICATE_CODE_ERROR_REMOVE,
} from '../actions/actionTypes'

const initialState = {
  status: '',
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [VERIFICATE_CODE_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [VERIFICATE_CODE_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [VERIFICATE_CODE_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [VERIFICATE_CODE_ERROR_REMOVE]: state => ({
    ...state,
    errors: [],
  }),
  [VERIFICATE_CODE_FULFILLED]: state => ({
    ...state,
    isLoading: false,
    errors: [],
    // status: action.payload !== null ? action.payload.response.verification.result.status : '',
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
