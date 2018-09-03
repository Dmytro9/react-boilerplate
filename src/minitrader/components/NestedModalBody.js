import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { receiveTermsStart } from '../actions/receiveTerms'


class NestedModalBody extends Component {
  componentDidMount() {
    this.props.receiveTermsStart()
  }

  render() {
    const { html } = this.props
    let pageContent = ''

    if (this.props.loading) {
      pageContent = (
        <div className='loader'>
          Loading...
        </div>
      )
    } else {
      pageContent = (
        <div dangerouslySetInnerHTML={{ __html: html }} /> // eslint-disable-line
      )
    }

    return pageContent
  }
}

NestedModalBody.propTypes = {
  html: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  receiveTermsStart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  html: state.minitrader.terms.html,
  loading: state.minitrader.terms.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  receiveTermsStart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NestedModalBody)
