import React from 'react'
import PropTypes from 'prop-types'

const AppLoader = ({ isLoading, error }) => {
  let content = ''

  if (isLoading) {
    content = (
      <div className='AppLoader'>
        <p>Loading...</p>
      </div>
    )
  } else if (error) {
    content = <div className='AppLoader'>Sorry, there was a problem loading the page.</div>
  }

  return <div className='AppLoader'>{content}</div>
}

AppLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
}

AppLoader.defaultProps = {
  error: false,
}
export default AppLoader
