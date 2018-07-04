import { obj } from 'the-utils'
import {
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_ERROR,
  ITEM_CHANGE,
  ADD_ITEM_SUCCESS,
} from '../actions/consts'

const initialState = {
  data: {},
  isLoading: false,
  errors: [],
  edited: false,
}

export const actionHandlers = {
  [GET_ITEM_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [GET_ITEM_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [GET_ITEM_SUCCESS]: (state, action) => {
    const application = action.payload.application !== undefined ? action.payload.application : {}
    return ({
      ...state,
      isLoading: false,
      edited: false,
      data: {
        ...state.data,
        application,
      },
    })
  },
  [ITEM_CHANGE]: (state, action) => ({
    ...state,
    edited: true,
    data: action.payload !== undefined ? action.payload : state.data,
  }),
  [ADD_ITEM_SUCCESS]: state => ({
    ...state,
    edited: false,
    data: {
      application: {
        name: '',
        friendlyName: '',
        address: '',
      },
    },
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
