import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'

import {
  REQUEST_TERMS_START,
  REQUEST_TERMS_FAILURE,
} from '../actions/actionTypes'

import { receiveTermsFulfilled } from '../actions/receiveTerms'


// epic
const fetchTerms = action$ => action$
  .ofType(REQUEST_TERMS_START)
  .mergeMap(() => Observable.ajax.getJSON('/wp-content/themes/s2trade/assets/data/terms.json')
    .map(response => receiveTermsFulfilled(response))
    .catch(error => Observable.of({
      type: REQUEST_TERMS_FAILURE,
      payload: error.xhr.response,
      error: true,
    })))

export default fetchTerms
