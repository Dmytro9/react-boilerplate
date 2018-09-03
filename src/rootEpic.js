import { combineEpics } from 'redux-observable'

// Import epics and combine
import home from './home/epics'
import minitrader from './minitrader/epics'

const rootEpic = combineEpics(
  home,
  minitrader,
)

export default rootEpic
