import {
  VERIFICATE_PHONE_START,
  VERIFICATE_PHONE_FULFILLED,
} from './actionTypes'


export function verificatePhoneStart(payload) {
  return {
    type: VERIFICATE_PHONE_START,
    payload,
  }
}

export function verificatePhoneFulfilled(payload) {
  return {
    type: VERIFICATE_PHONE_FULFILLED,
    payload,
  }
}
