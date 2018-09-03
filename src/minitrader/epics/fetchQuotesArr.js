import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mergeMap'
import {
  REQUEST_QUOTES_ARRAY_START,
  REQUEST_QUOTES_START,
} from '../actions/actionTypes'


const fetchQuotesArrEpic = action$ =>
  action$
    .ofType(REQUEST_QUOTES_ARRAY_START)
    .mergeMap(action => action.payload.map(({ symbol }) => ({ type: REQUEST_QUOTES_START, payload: symbol })))


export default fetchQuotesArrEpic
