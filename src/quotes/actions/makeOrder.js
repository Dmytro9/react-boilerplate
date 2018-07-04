import {
  MAKE_ORDER_START,
  MAKE_ORDER_FULFILLED,
} from './actionTypes'


export function makeOrderStart(payload) {
  return {
    type: MAKE_ORDER_START,
    payload,
  }
}

export function makeOrderFulfilled(payload) {
  return {
    type: MAKE_ORDER_FULFILLED,
    payload,
  }
}
