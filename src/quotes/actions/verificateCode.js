import {
  VERIFICATE_CODE_START,
  VERIFICATE_CODE_FULFILLED,
} from './actionTypes'


export function verificateCodeStart(payload) {
  return {
    type: VERIFICATE_CODE_START,
    payload,
  }
}

export function verificateCodeFulfilled(payload) {
  return {
    type: VERIFICATE_CODE_FULFILLED,
    payload,
  }
}
