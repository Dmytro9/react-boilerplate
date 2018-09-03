import { SET_VISIBILITY } from './actionTypes'

export default function setVisible(payload) {
  return {
    type: SET_VISIBILITY,
    payload,
  }
}
