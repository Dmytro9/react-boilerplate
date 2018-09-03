import {
  REQUEST_TERMS_START,
  REQUEST_TERMS_FULFILLED,
} from './actionTypes'


export function receiveTermsStart(payload) {
  return {
    type: REQUEST_TERMS_START,
    payload,
  }
}

export function receiveTermsFulfilled(payload) {
  return {
    type: REQUEST_TERMS_FULFILLED,
    payload,
  }
}
