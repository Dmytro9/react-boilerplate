import { obj } from 'the-utils'
import { SET_VISIBILITY } from '../actions/actionTypes'

const initialState = {
  visible: true,
}

export const actionHandlers = {
  [SET_VISIBILITY]: (state, action) => ({
    ...state,
    visible: action.payload,
  }),
}

const reducers = (state = initialState, action) => {
  const handler = actionHandlers[obj.get(action, 'type', 'default')]
  return handler ? handler(state, action) : state
}

export default reducers
