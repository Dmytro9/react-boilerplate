import {
  VERIFICATE_CODE_START,
  VERIFICATE_CODE_FULFILLED,
  VERIFICATE_CODE_ERROR,
  VERIFICATE_CODE_ERROR_REMOVE,
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

export function verificateCodeError(payload) {
  return {
    type: VERIFICATE_CODE_ERROR,
    payload,
  }
}

export function verificateCodeErrorRemove() {
  return {
    type: VERIFICATE_CODE_ERROR_REMOVE,
  }
}

