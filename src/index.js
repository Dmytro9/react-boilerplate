import React from 'react'
// import ReactDOM from 'react-dom'
import { render } from 'react-snapshot'
import 'rxjs'
import ReactGA from 'react-ga'
// import registerServiceWorker from './registerServiceWorker'
import App from './App.2'

// ReactGA.initialize('UA-120386702-1')

ReactGA.initialize('UA-114664271-1')
// ReactGA.pageview(window.location.pathname + window.location.search)

// ReactDOM.render(
render(
  <App />,
  document.getElementById('minitrader')
)
// registerServiceWorker()
