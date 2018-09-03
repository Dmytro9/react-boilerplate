import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Row, Col } from 'reactstrap'
import { PropTypes } from 'prop-types'
// import ReactGA from 'react-ga'
import HocModal from '../HOC/HocModal'
import { goTo } from './../../common/actions/goTo'
import setVisible from './../actions/setVisible'
import { receiveQuotesEnd } from './../actions/receiveQuotes'
import { sendEventStart } from './../actions/sendEvent'


class thanksSection extends Component {
  componentDidMount() {
    localStorage.setItem('order', true)
  }

  // gaClose = () => {
  //   ReactGA.event({
  //     category: 'Tanks',
  //     action: 'Close',
  //     label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
  //   })
  // }

  handleClose = () => {
    // this.gaClose()
    this.props.setVisible(false)
    this.props.receiveQuotesEnd()
    this.props.sendEventStart({ event_name: 'ThanksSection.Close', meta: '' })
    this.props.goTo('/')
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <div className='d-flex justify-content-center'>
              <h3 className='font-weight-bold text-center' style={{ flex: 1 }}>Thank You</h3>
              <Button
                color='link'
                className='quote_close-btn p-0'
                onClick={this.handleClose}
              >
                ✕
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p
              className='text-center pt-4 pb-3'
              style={{ fontSize: 20 }}
            >
              Your Phone is approved
            </p>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}


thanksSection.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      symbol: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  goTo: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  receiveQuotesEnd: PropTypes.func.isRequired,
  sendEventStart: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo,
  setVisible,
  receiveQuotesEnd,
  sendEventStart,
}, dispatch)

export default connect(null, mapDispatchToProps)(HocModal(thanksSection))
