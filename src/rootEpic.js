import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import quotes from './quotes/epics'
import crud from './crud/epics'
// import deposit from './deposit_mobile/epics'

const rootEpic = combineEpics(
  home,
  quotes,
  crud,
  // deposit,
)

export default rootEpic
