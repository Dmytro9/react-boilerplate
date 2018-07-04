import React from 'react'
import 'rxjs'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import 'bootstrap/dist/css/bootstrap.css'

import store, { history } from './store'

// Styles
import './App.css'

// routes
import routes from './asyncRoutes'

// common components
import Header from './common/components/Header'
import Footer from './common/components/Footer'

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='App'>
          <Header />
          <div className='wrap'>
            {routes}
          </div>
          <Footer />
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
