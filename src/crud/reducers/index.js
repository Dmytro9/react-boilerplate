import { combineReducers } from 'redux'

// import your Quotes Module reducers here and combine them
// Placed in same directory
import applications from './getData'
import addItem from './addItem'
import deleteItem from './deleteItem'
import notifications from './notifications'
import item from './getItem'
import editItem from './editItem'

const crud = combineReducers({
  applications,
  addItem,
  deleteItem,
  notifications,
  item,
  editItem,
})

export default crud
