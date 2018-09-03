import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import 'rxjs'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import store, { history } from './store'

// Styles
import './App.css'

// routes
import routes from './routes'
// Async routes
// import routes from './asyncRoutes'

// common components
// import Header from './common/components/Header'
// import Footer from './common/components/Footer'

function App() {
  return (
    <Provider store={store}>
      {/* <Router history={history} basename='/cra-boilerplate/'> */}
      <Router history={history}>
        <div className='App'>
          {routes}
        </div>
      </Router>
    </Provider>
  )
}

export default App
