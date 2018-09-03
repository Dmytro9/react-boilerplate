import { obj } from 'the-utils'
import {
  CHECKIN_USER_START,
  CHECKIN_USER_FULFILLED,
  CHECKIN_USER_FAILED,
} from '../actions/actionTypes'


const initialState = {
  visits: 100,
  id: 0,
  email: '',
  funnel: '',
  phone: '',
}

export const actionHandlers = {
  [CHECKIN_USER_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [CHECKIN_USER_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [CHECKIN_USER_FULFILLED]: (state, action) => ({
    ...state,
    isLoading: false,
    visits: obj.deep(action, ['payload', 'login_qty'], 0),
    id: obj.deep(action, ['payload', 'current_user', 'id'], 0),
    email: obj.deep(action, ['payload', 'current_user', 'email'], ''),
    funnel: obj.deep(action, ['payload', 'funnel'], ''),
    phone: obj.deep(action, ['payload', 'current_user', 'phone'], ''),
  }),
}


const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
