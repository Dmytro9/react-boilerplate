import { ITEM_CHANGE } from './consts'

const itemChange = payload => ({
  type: ITEM_CHANGE,
  payload,
})

export default itemChange
