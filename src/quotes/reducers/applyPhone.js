import { obj } from 'the-utils'
import {
  VERIFICATE_PHONE_START,
  VERIFICATE_PHONE_FULFILLED,
  VERIFICATE_PHONE_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  phone: '',
  request_id: '',
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [VERIFICATE_PHONE_START]: (state, action) => ({
    ...state,
    isLoading: true,
    phone: action.payload !== null ? action.payload : '',
  }),
  [VERIFICATE_PHONE_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [VERIFICATE_PHONE_FULFILLED]: (state, action) =>
    // console.log(action)
    ({
      ...state,
      isLoading: false,
      phone: action.payload !== null ? action.payload.response.verification.phone : '',
      request_id: action.payload !== null ? action.payload.response.verification.result.request_id : '',
    })
  ,
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
