import { Observable } from 'rxjs'
import { WebSocketSubject } from 'rxjs/webSocket'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/debounceTime'

import {
  REQUEST_QUOTES_START,
  REQUEST_QUOTES_END,
  RECEIVE_QUOTES_FULFILLED,
} from '../actions/actionTypes'


// Set regexp for geting CL-Month-Year Oil Asset
const pattern = /^CL-[A-Z]{3}\d{2}$/

// const socket = WebSocketSubject.create('ws://35.195.28.154:44300/all')
const socket = new WebSocketSubject('wss://feed.devopdata.co/ws2/all')

// epic
const fetchQuotesEpic = action$ =>
  action$
    .ofType(REQUEST_QUOTES_START)
    .mergeMap(action =>
      socket.multiplex(
        () => ({ sub: action.payload }),
        () => ({ unsub: action.payload }),
        msg => {
          return (msg.symbol === action.payload || (msg.symbol.match(pattern) ? true : false))
        }
      )
        .retryWhen(() => (window.navigator.onLine ?
          Observable.timer(1000) :
          Observable.fromEvent(window, 'online')))
        .takeUntil(action$.ofType(REQUEST_QUOTES_END))
        .map(payload => ({
          type: RECEIVE_QUOTES_FULFILLED,
          payload,
        })))


export default fetchQuotesEpic
