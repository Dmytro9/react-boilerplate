import { obj } from 'the-utils'
import {
  SEND_EVENT_START,
  SEND_EVENT_FULFILLED,
} from './actionTypes'
import vMinitrader from '../../common/globals'


export const sendEventStart = payload => (dispatch, getState) => {
  const store = getState()

  // Take phone from register page
  const phoneNumber = vMinitrader.current_user.phone

  const instrument = obj.deep(store, ['minitrader', 'order', 'data', 'pair', 'symbol'], '')
  const actionType = obj.deep(store, ['minitrader', 'order', 'data', 'operation'], '')
  const stopLossAmount =
    (
      actionType === 'buy'
        ?
        obj.deep(store, ['minitrader', 'order', 'data', 'priceMin'], '')
        :
        obj.deep(store, ['minitrader', 'order', 'data', 'priceMax'], '')
    )
  const takeProfitAmount =
    (
      actionType === 'sell'
        ?
        obj.deep(store, ['minitrader', 'order', 'data', 'priceMin'], '')
        :
        obj.deep(store, ['minitrader', 'order', 'data', 'priceMax'], '')
    )
  // const phone_number = obj.deep(store, ['minitrader', 'phoneData', 'phone'], '')
  // const { email, id } = obj.deep(store, ['minitrader', 'user'], '')
  const eventName = obj.get(payload, 'event_name', 'Unknown') // 'approved'
  // const openTime = obj.get(payload, 'open_time', '') // 'approved'
  // const login_session_number = 1
  const meta = obj.get(payload, 'meta', '') // 'verification completed'
  // const brand_name = 's2trade'
  const price = obj.deep(store, ['minitrader', 'order', 'data', 'price'], '')
  // const ask = obj.deep(store, ['minitrader', 'order', 'data', 'pair', 'ask'], '')
  // const bid = obj.deep(store, ['minitrader', 'order', 'data', 'pair', 'bid'], '')

  const result = {
    type: SEND_EVENT_START,
    payload: {
      instrument,
      action_type: actionType,
      stop_loss_amount: stopLossAmount,
      take_profit_amount: takeProfitAmount,
      phone_number: phoneNumber,
      // email,
      // account_number: id,
      event_name: eventName,
      // login_session_number,
      meta,
      price,
      // open_time: openTime,
      // close_time: openTime + 2,
      // brand_name,
      // ask,
      // bid,
    },
  }

  dispatch(result)
  return result
}

export function sendEventFulfilled(payload) {
  return {
    type: SEND_EVENT_FULFILLED,
    payload,
  }
}
