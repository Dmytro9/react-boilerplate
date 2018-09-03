import 'rxjs/add/observable/of'
import 'rxjs/add/operator/switchMap'

import {
  CHECKIN_USER_START,
  CHECKIN_USER_FULFILLED,
} from '../actions/actionTypes'


// epic
const user = action$ =>
  action$
    .ofType(CHECKIN_USER_START)
    .map(action => ({ type: CHECKIN_USER_FULFILLED, payload: action.payload }))

export default user
