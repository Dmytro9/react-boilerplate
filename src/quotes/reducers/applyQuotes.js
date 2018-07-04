import { obj } from 'the-utils'
// import mockQuotes from '../../mockData'
import {
  REQUEST_QUOTES_START,
  RECEIVE_QUOTES_FULFILLED,
  REQUEST_QUOTES_FAILED,
} from '../actions/actionTypes'

const initialState = {
  // quotes: [...mockQuotes],
  // quotes: [],
  quotes0: {},
  symbols: [
    { symbol: 'BTCUSD', label: 'BITCOIN' },
    { symbol: 'EURUSD', label: 'EUR/USD' },
    { symbol: 'EURJPY', label: 'EUR/JPY' },
    { symbol: 'USOILsc', label: 'OIL' },
    { symbol: 'XAUUSD', label: 'GOLD/USD' },
  ],
  // symbols: ['BTCUSD', 'EURUSD', 'EURJPY', 'USOILsc', 'XAUUSD'],
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_QUOTES_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [REQUEST_QUOTES_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [RECEIVE_QUOTES_FULFILLED]: (state, action) => {
    let quotes0 = { ...state.quotes0 }
    // if (action.payload !== null && obj.get(state.symbols, action.payload.symbol, false) !== false) {
    if (action.payload !== null) {
      quotes0 = { ...state.quotes0, [action.payload.symbol]: action.payload }
    }
    return {
      ...state,
      isLoading: false,
      quotes0,
    }
  },
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
