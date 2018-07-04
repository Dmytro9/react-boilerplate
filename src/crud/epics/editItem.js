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
  EDIT_ITEM_REQUEST,
  // REQUEST_QUOTES_END,
  EDIT_ITEM_ERROR,
  // REQUEST_QUOTES_FAILED,
} from '../actions/consts'

import { editItemSucceed } from '../actions/editItem'
import { makeDataRequest } from '../actions/makeDataRequest'

const url = 'http://api.appshub.xyz/v1/applications/'
// const url = 'http://localhost:4060/v1/applications'
// epic
const EditItemEpic = action$ => action$
  .ofType(EDIT_ITEM_REQUEST)
  .mergeMap(action =>
    Observable.ajax({
      url: `${url}${action.id}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: { application: action.payload },
    })
      .mergeMap(response => [editItemSucceed(response.response.notifications), makeDataRequest(response)])
      // .switchMap(action => Observable.of(makeDataRequest(action)))
      .catch(error => Observable.of({
        type: EDIT_ITEM_ERROR,
        payload: error.xhr.response,
        error: true,
      })))

export default EditItemEpic
