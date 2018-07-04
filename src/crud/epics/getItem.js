import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/debounceTime'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'
import {
  GET_ITEM_REQUEST,
  GET_ITEM_ERROR,
} from '../actions/consts'

import { getItemSucceed } from '../actions/getItem'

const url = 'http://api.appshub.xyz/v1/applications/'
// const url = 'http://localhost:4060/v1/applications'
// epic
const getItemEpic = action$ => action$
  .ofType(GET_ITEM_REQUEST)
  .mergeMap(action =>
    Observable.ajax({
      url: `${url}${action.payload}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .map(result => getItemSucceed(result.response))
      .catch(error => Observable.of({
        type: GET_ITEM_ERROR,
        payload: error.xhr.response,
        error: true,
      })))

export default getItemEpic
