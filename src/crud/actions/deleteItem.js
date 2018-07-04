import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
} from './consts'

export const deleteRequest = payload => ({
  type: DELETE_ITEM_REQUEST,
  payload,
})

export const deleteItemSucceed = payload => ({
  type: DELETE_ITEM_SUCCESS,
  payload,
})
