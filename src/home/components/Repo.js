import React from 'react'
import PropTypes from 'prop-types'


const Repo = props => (
  <li>
    <a href={props.html_url} target='_blank' rel='noopener noreferrer'>{props.name}</a>
  </li>
)

Repo.propTypes = {
  html_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Repo
