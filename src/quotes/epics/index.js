import { combineEpics } from 'redux-observable'

// import your Home Module epics here and combine them
// Place all epics in same directory
import fetchQuotesEpic from './fetchQuotes'
import fetchQuotesArr from './fetchQuotesArr'
import fetchTerms from './fetchTerms'
import verificatePhone from './verificatePhone'
import verificateCode from './verificateCode'

const quotes = combineEpics(fetchQuotesEpic, fetchQuotesArr, fetchTerms, verificatePhone, verificateCode)

export default quotes
