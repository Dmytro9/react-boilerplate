import { Observable } from 'rxjs'
import { str } from 'the-utils'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'

import {
  VERIFICATE_CODE_START,
  VERIFICATE_CODE_FAILURE,
} from '../actions/actionTypes'

import { goTo } from '../../common/actions/goTo'
import { verificateCodeError } from '../actions/verificateCode'


// epic fn
const verificateCode = (action$, store) => action$
  .ofType(VERIFICATE_CODE_START)

  // `https://sms.ourmicroservices.com/check/?code=${action.payload.code}&phone=${action.payload.phone}`,

  .switchMap(action => Observable.ajax.post(
    `${window.location.protocol}//${window.location.hostname}/wp-content/themes/s2trade/ajax-handler-miniwebtrader-sms.php`,
    {
      phone: action.payload.phone,
      action: 'verify',
      code: action.payload.code
    },
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  )
    .map((response) => {
      if (str.toBoolean(response.response.success) === true) {
        goTo('/thanks')(store.dispatch)
      } else {
        return verificateCodeError('You sent the wrong code')
      }
      return true
    }))

  .catch(error => Observable.of({
    type: VERIFICATE_CODE_FAILURE,
    payload: error.response,
    error: true,
  }))

export default verificateCode
