import React from 'react'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'
import AppLoader from './common/components/AppLoader'

// Import modules/routes
import PageNotFound from './common/components/PageNotFound'

// Code splitting with dynamic import
// https://reactjs.org/docs/code-splitting.html
const Home = Loadable({
  loader: () => import('./home'),
  loading: AppLoader,
})

const About = Loadable({
  loader: () => import('./about'),
  loading: AppLoader,
})

const Quotes = Loadable({
  loader: () => import('./quotes'),
  loading: AppLoader,
})


export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/quotes' component={Quotes} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
