import React from 'react'
import Helmet from 'react-helmet'
import { Container } from 'reactstrap'
import ReactGA from 'react-ga'
import UserRepos from './containers/UserRepos'
import './style.css'

function Home() {
  ReactGA.pageview(window.location.pathname + window.location.search)
  return (
    <div id='home'>
      <Helmet title='Checking user repos' />
      <Container>
        <h2 className='text-center'>Home</h2>
        <UserRepos />
      </Container>
    </div>
  )
}

export default Home
