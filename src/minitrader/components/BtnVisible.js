import React from 'react'
import { Button } from 'reactstrap'
import { PropTypes } from 'prop-types'

const BtnVisible = props => (
  <Button
    onClick={props.onClick}
    className='start-trading btn btn-warning btn-lg'
  >
    Start Trading
  </Button >
)


BtnVisible.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BtnVisible
