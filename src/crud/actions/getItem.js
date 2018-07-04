import {
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
} from './consts'


export const getItemRequest = payload => ({
  type: GET_ITEM_REQUEST,
  payload,
})

export const getItemSucceed = payload => ({
  type: GET_ITEM_SUCCESS,
  payload,
})
