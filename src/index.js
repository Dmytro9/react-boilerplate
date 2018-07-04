import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-snapshot'
import 'rxjs'
import ReactGA from 'react-ga'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'

ReactGA.initialize('UA-120386702-1')
// ReactGA.pageview(window.location.pathname + window.location.search)

// ReactDOM.render(
render(
  <App />,
  document.getElementById('root')
)
// registerServiceWorker()
