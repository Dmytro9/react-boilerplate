import { GET_RANGE_START } from './actionTypes'


export function getRangeStart(payload) {
  return {
    type: GET_RANGE_START,
    payload,
  }
}
