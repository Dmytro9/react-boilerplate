import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'

import {
  VERIFICATE_CODE_START,
  VERIFICATE_CODE_FAILURE,
} from '../actions/actionTypes'

import { verificateCodeFulfilled } from '../actions/verificateCode'


// epic
const verificateCode = action$ => action$
  .ofType(VERIFICATE_CODE_START)
  .debounceTime(500)
  .switchMap(action =>
    Observable.ajax.post(
      // 'http://localhost:4060/v1/verification/code',
      '/api/v1/verification/code',
      {
        code: action.payload.code,
        request_id: action.payload.request_id,
      },
      { 'Content-Type': 'application/json' }
    )
      .map(response => verificateCodeFulfilled(response))
      .do((response) => {
        // console.log(response)
        if (response.payload.response.verification.result.status !== '0') {
          alert('Verification failed...')
        } else {
          console.log('Verification passed...')
        }
      }))
  .catch(error => Observable.of({
    type: VERIFICATE_CODE_FAILURE,
    payload: error.response,
    error: true,
  }))

export default verificateCode
