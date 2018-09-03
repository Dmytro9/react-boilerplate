import React from 'react'
import { Route, Switch } from 'react-router'
import Order from './minitrader/containers/Order'
import PhoneVerification from './minitrader/containers/PhoneVerification'
import CodeVerification from './minitrader/containers/CodeVerification'
import QuotesList from './minitrader/containers/QuotesList'
import Minitrader from './minitrader'
import thanksSection from './minitrader/containers/thanksSection'
// Import modules/routes
import PageNotFound from './common/components/PageNotFound'


export default (
  // <Route path='/' component={QuotesRoot}>
  <Switch>
    <Minitrader>
      <Route exact path='/' component={QuotesList} />
      <Route path='/quotes' component={QuotesList} />
      <Route path='/order/:symbol/:type' component={Order} />
      <Route path='/phone-verification' component={PhoneVerification} />
      <Route path='/code-verification' component={CodeVerification} />
      <Route path='/thanks' component={thanksSection} />
    </Minitrader>
    <Route path='*' component={PageNotFound} />
  </Switch>
)
