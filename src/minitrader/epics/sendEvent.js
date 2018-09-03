import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

import {
  SEND_EVENT_START,
  SEND_EVENT_FAILURE,
} from '../actions/actionTypes'


// epic`
const sendEvent = action$ =>
  action$
    .ofType(SEND_EVENT_START)
    .switchMap(({ payload }) => Observable.ajax.post(
      // '/api/v1/miniwebtrader/event/add',
      '/wp-content/themes/s2trade/ajax-handler-miniwebtrader.php',
      payload,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      }
    ))
    .catch(error => Observable.of({
      type: SEND_EVENT_FAILURE,
      payload: error.xhr.response,
      error: true,
    }))

export default sendEvent
