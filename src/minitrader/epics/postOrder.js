import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'

import { VERIFICATE_CODE_FULFILLED } from '../actions/actionTypes'
import { sendEventStart } from './../actions/sendEvent'


// epic
const postOrder = (action$, store) =>
  action$
    .ofType(VERIFICATE_CODE_FULFILLED)
    .map(() => sendEventStart({
      event_name: 'phoneApproved',
      meta: 'verification Completed',
      store,
    })(store.dispatch, store.getState))

export default postOrder
