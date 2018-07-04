import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/delay'
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/ignoreElements'

import {
  REQUEST_USER_REPOS_START,
  REQUEST_USER_REPOS_FAILED,
} from '../actions/actionTypes'

import { doUserReposFulfilled } from '../actions/doUserRepos'


// epic
const fetchUserRepos = action$ => action$
  .ofType(REQUEST_USER_REPOS_START)
  .mergeMap(action =>
    Observable.ajax.getJSON(`https://api.github.com/users/${action.payload}/repos`)
      .map(response => doUserReposFulfilled(response))
      .catch(error => Observable.of({
        type: REQUEST_USER_REPOS_FAILED,
        payload: error.xhr.response,
        error: true,
      })))

export default fetchUserRepos
