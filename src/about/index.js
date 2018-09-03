import React from 'react'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'
import { Container } from 'reactstrap'
import './style.css'

function About() {
  ReactGA.pageview(window.location.pathname + window.location.search)
  return (
    <div id='about'>
      <Helmet title='About the app' />
      <Container>
        <h2 className='text-center'>
          About
        </h2>
        <p>About page content</p>
      </Container>
    </div>
  )
}

export default About
