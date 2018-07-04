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
  DELETE_ITEM_REQUEST,
  // REQUEST_QUOTES_END,
  DELETE_ITEM_ERROR,
  // REQUEST_QUOTES_FAILED,
} from '../actions/consts'

import { deleteItemSucceed } from '../actions/deleteItem'
import { makeDataRequest } from '../actions/makeDataRequest'
import { goTo } from '../../common/actions/goTo'

const url = 'http://api.appshub.xyz/v1/applications/'
// const url = 'http://localhost:4060/v1/applications'
// epic
const DeleteItemEpic = (action$, store) => action$
  .ofType(DELETE_ITEM_REQUEST)
  .mergeMap(action =>
    Observable.ajax({
      url: `${url}${action.payload}`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .mergeMap(result => [
        deleteItemSucceed(result.response.notifications),
        makeDataRequest(result),
      ])
      .do(() => goTo('/crud/list')(store.dispatch))
      // .switchMap(action => Observable.of(makeDataRequest(action)))
      .catch(error => Observable.of({
        type: DELETE_ITEM_ERROR,
        payload: error.xhr.response,
        error: true,
      })))

export default DeleteItemEpic
