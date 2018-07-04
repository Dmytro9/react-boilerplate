import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from './consts'


export const makeDataRequest = payload => ({
  type: FETCH_DATA_REQUEST,
  payload,
})

export const makeDataRequestSucceed = payload => ({
  type: FETCH_DATA_SUCCESS,
  payload,
})
