import {
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
} from './consts'


export const editItemRequest = (id, payload) => ({
  type: EDIT_ITEM_REQUEST,
  id,
  payload,
})

export const editItemSucceed = payload => ({
  type: EDIT_ITEM_SUCCESS,
  payload,
})
