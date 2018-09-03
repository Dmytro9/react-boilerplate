import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import your Module reducers here and combine them
import home from './home/reducers'
import minitrader from './minitrader/reducers'

// const initialReducers = {
// home: (state = HomeInitialState) => state,
// }

const rootReducer = combineReducers({
  router: routerReducer,
  home,
  minitrader,
  // ...initialReducers,
})

export default rootReducer
