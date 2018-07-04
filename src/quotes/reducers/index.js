import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import newQuotes from './applyQuotes'
import order from './applyOrder'
import terms from './applyTerms'
import phoneData from './applyPhone'
import verificationStatus from './applyCode'

const quotes = combineReducers({
  newQuotes,
  order,
  terms,
  phoneData,
  verificationStatus,
})

export default quotes
