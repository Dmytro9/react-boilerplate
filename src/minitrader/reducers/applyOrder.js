import { obj } from 'the-utils'
import {
  REQUEST_QUOTES_START,
  MAKE_ORDER_FULFILLED,
  MAKE_ORDER_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  data: {
    pair: { symbol: '' },
    priceMin: '',
    priceMax: '',
    operation: '',
    symbol: '',
    price: '',
  },
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_QUOTES_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [MAKE_ORDER_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [MAKE_ORDER_FULFILLED]: (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload !== null ? action.payload : [],
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
