import { obj } from 'the-utils'
import {
  REQUEST_USER_REPOS_START,
  REQUEST_USER_REPOS_SUCCESS,
  REQUEST_USER_REPOS_FAILED,
} from '../actions/actionTypes'

const initialState = {
  repos: [],
  isLoading: false,
  errors: [],
}

export const actionHandlers = {
  [REQUEST_USER_REPOS_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [REQUEST_USER_REPOS_FAILED]: (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }),
  [REQUEST_USER_REPOS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    repos: action.payload !== null ? action.payload : [],
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
