import { CLEAR_NOTIFICATION } from './consts'

const clearNotification = payload => ({
  type: CLEAR_NOTIFICATION,
  payload,
})

export default clearNotification
