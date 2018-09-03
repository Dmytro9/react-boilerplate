import { obj } from 'the-utils'
import {
  REQUEST_QUOTES_START,
  RECEIVE_QUOTES_FULFILLED,
  REQUEST_QUOTES_FAILED,
} from '../actions/actionTypes'


const monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let year = parseInt(new Date().getFullYear().toString().slice(-2), 10)

// Get date to set which month to get oil asset from
function specifyAsset() {
  // const date = new Date().getDate()
  const month = new Date().getMonth()

  // let monthIndex = (date <= 19) ? (month + 1) : (month + 2)

  // Api send the pair of asset always with current month + 1
  let monthIndex = month + 1
  let monthIndexNext = month + 2

  if (monthIndex === 12) {
    monthIndex = 0
    year += 1
  }
  if (monthIndexNext === 12) {
    monthIndexNext = 0
    year += 1
  }
  if (monthIndexNext === 13) {
    monthIndexNext = 1
    year += 1
  }
  // else if (monthIndex === 13) {
  //   monthIndex = 1
  //   year += 1
  // }

  return (
    {
      currOilAsset: monthArr[monthIndex],
      currOilAssetNext: monthArr[monthIndexNext]
    }
  )
}
const { currOilAsset, currOilAssetNext } = specifyAsset()


const initialState = {
  // quotes: [],
  quotes: {},
  symbols: [
    { symbol: 'BTCUSD', label: 'BITCOIN' },
    { symbol: 'EURUSD', label: 'EUR/USD' },
    { symbol: 'EURJPY', label: 'EUR/JPY' },
    { symbol: `CL-${currOilAsset}${year}`, label: 'OIL' },
    { symbol: `CL-${currOilAssetNext}${year}`, label: 'OIL' },
    // { symbol: 'USOILsc', label: 'OIL' },
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
    let quotes = { ...state.quotes }
    if (action.payload !== null) {
      quotes = { ...state.quotes, [action.payload.symbol]: action.payload }
    }
    return {
      ...state,
      isLoading: false,
      quotes,
    }
  },
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
