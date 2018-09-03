import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'

import { goTo } from '../../common/actions/goTo'

import {
  VERIFICATE_PHONE_START,
  VERIFICATE_PHONE_FAILURE,
} from '../actions/actionTypes'


// epic
const verificatePhone = (action$, store) =>
  action$
    .ofType(VERIFICATE_PHONE_START)
    .switchMap(action => Observable.ajax.post(
      `${window.location.protocol}//${window.location.hostname}/wp-content/themes/s2trade/ajax-handler-miniwebtrader-sms.php`,
      {
        action: 'send',
        phone: action.payload
      },
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    )
      .map(() => {
        goTo('/code-verification')(store.dispatch)
        return true
      }))
    .catch(error => Observable.of({
      type: VERIFICATE_PHONE_FAILURE,
      payload: error.response,
      error: true,
    }))

export default verificatePhone
