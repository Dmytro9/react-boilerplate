import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import fetchQuotesEpic from './fetchQuotes'
import fetchQuotesArr from './fetchQuotesArr'
import fetchTerms from './fetchTerms'
import sendEvent from './sendEvent'
import verificatePhone from './verificatePhone'
import verificateCode from './verificateCode'
import user from './user'
import postOrder from './postOrder'
import removeError from './removeError'
import getRange from './getRange'

const quotes = combineEpics(
  fetchQuotesEpic,
  fetchQuotesArr,
  fetchTerms,
  verificatePhone,
  verificateCode,
  user,
  postOrder,
  sendEvent,
  removeError,
  getRange,
)

export default quotes
