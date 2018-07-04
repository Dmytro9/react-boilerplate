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

const Crud = Loadable({
  loader: () => import('./crud'),
  loading: AppLoader,
})

const Deposit = Loadable({
  loader: () => import('./deposit_mobile'),
  loading: AppLoader,
})


export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/crud' component={Crud} />
    <Route path='/quotes' component={Quotes} />
    <Route path='/deposit' component={Deposit} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
