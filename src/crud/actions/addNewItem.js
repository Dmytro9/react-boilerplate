import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
} from './consts'


export const AddItemRequest = payload => ({
  type: ADD_ITEM_REQUEST,
  payload,
})

export const addNewItemSucceed = payload => ({
  type: ADD_ITEM_SUCCESS,
  payload,
})
