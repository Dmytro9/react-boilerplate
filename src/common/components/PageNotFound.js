import React from 'react'
import Helmet from 'react-helmet'

function PageNotFound() {
  return (
    <div>
      <Helmet title='Page is not found' />
      <h2 className='text-center'>Page not found!</h2>
    </div>
  )
}

export default PageNotFound
