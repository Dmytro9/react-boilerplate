import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/ignoreElements'

import { goTo } from '../../common/actions/goTo'

import {
  VERIFICATE_PHONE_START,
  VERIFICATE_PHONE_FAILURE,
} from '../actions/actionTypes'

import { verificatePhoneFulfilled } from '../actions/verificatePhone'


// epic
const verificatePhone = (action$, store) =>
  action$
    .ofType(VERIFICATE_PHONE_START)
    .debounceTime(500)
    .switchMap(action => Observable.ajax.post(
      // 'http://localhost:4060/v1/verification/phone',
      '/api/v1/verification/phone',
      { phone: action.payload },
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    )
      .map(response => verificatePhoneFulfilled(response))
      .do((response) => {
        if (response.payload.response.verification.result.status === '0') {
          goTo('/quotes/code-verification')(store.dispatch)
        }
      }))
    .catch(error => Observable.of({
      type: VERIFICATE_PHONE_FAILURE,
      payload: error.response,
      error: true,
    }))


export default verificatePhone
