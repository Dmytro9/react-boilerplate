// import store from '../store'
// import { RECEIVE_QUOTES_FAILURE } from '../quotes/actions/actionTypes'
// import {
//   receiveQuotes,
//   receiveQuotesFulfilled,
// } from '../quotes/actions/receiveQuotes'


// export default () => {
//   let socket

//   const open = () => {
//     socket = new WebSocket('ws://35.195.28.154:44300/all')
//     const { dispatch } = store

//     // const state = store.getState()
//     dispatch(receiveQuotes())
//     // dispatch(receiveQuotesFulfilled(state.quotes.newQuotes.quotes))

//     socket.onopen = () => {
//       console.log('WS Open!')
//       socket.send('hello from client')
//     }

//     try {
//       socket.onmessage = ({ data }) => {
//         const res = JSON.parse(data)
//         // console.log('res', res)
//         dispatch(receiveQuotesFulfilled(res))
//       }
//     } catch (err) {
//       dispatch({
//         type: RECEIVE_QUOTES_FAILURE,
//         // payload: err.xhr.response,
//         payload: 'error',
//         error: true,
//       })
//     }

//     socket.onclose = () => {
//       console.log('WS Closed!')
//     }
//   }

//   const close = () => {
//     if (socket) socket.close()
//   }

//   return {
//     open,
//     close,
//   }
// }


// import { Observable } from 'rxjs'
// import 'rxjs/add/observable/of'
// import { WebSocketSubject } from 'rxjs/webSocket';

// const socket = WebSocketSubject.create('ws://localhost:8080')

// const socketEpic = (action$, state) =>
// action$.ofType('START')
