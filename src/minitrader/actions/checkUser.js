import {
  CHECKIN_USER_START,
  CHECKIN_USER_FULFILLED,
} from './actionTypes'


export function checkUserStart(payload) {
  return {
    type: CHECKIN_USER_START,
    payload,
  }
}

export function checkUserFulfilled(payload) {
  return {
    type: CHECKIN_USER_FULFILLED,
    payload,
  }
}
