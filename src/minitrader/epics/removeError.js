import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/delay'

import {
  VERIFICATE_CODE_ERROR,
  VERIFICATE_CODE_ERROR_REMOVE,
} from '../actions/actionTypes'


// epic
const removeError = action$ =>
  action$
    .ofType(VERIFICATE_CODE_ERROR)
    .delay(4000)
    .mapTo({ type: VERIFICATE_CODE_ERROR_REMOVE })


export default removeError
