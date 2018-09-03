import ReactGA from 'react-ga'
import 'rxjs/add/operator/debounceTime'
import { GET_RANGE_START } from '../actions/actionTypes'


const getRange = action$ =>
  action$
    .ofType(GET_RANGE_START)
    .debounceTime(1000)
    .map(action => ({ type: 'GET_RANGE_FULFILLED', payload: action.payload }))
    .do(({ payload }) => {
      ReactGA.event({
        category: 'AssetOrder',
        action: payload,
      })
    })

export default getRange
