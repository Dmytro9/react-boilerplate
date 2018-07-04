import {
  REQUEST_QUOTES_START,
  RECEIVE_QUOTES_FULFILLED,
  REQUEST_QUOTES_ARRAY_START,
} from './actionTypes'


export function receiveQuotesStart(payload) {
  return {
    type: REQUEST_QUOTES_START,
    payload,
  }
}

export function receiveQuotesArrStart(payload) {
  return {
    type: REQUEST_QUOTES_ARRAY_START,
    payload,
  }
}

export function receiveQuotesFulfilled(payload) {
  return {
    type: RECEIVE_QUOTES_FULFILLED,
    payload,
  }
}
