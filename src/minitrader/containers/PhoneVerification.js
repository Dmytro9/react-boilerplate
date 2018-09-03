import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button, Form, FormGroup } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import ReactGA from 'react-ga'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'
import { isValidNumber } from 'libphonenumber-js'
import { Link } from 'react-router-dom'
import { goTo } from '../../common/actions/goTo'
import HocModal from '../HOC/HocModal'
import { verificatePhoneStart } from '../actions/verificatePhone'
import { receiveQuotesEnd } from './../actions/receiveQuotes'
import setVisible from './../actions/setVisible'
import { sendEventStart } from './../actions/sendEvent'


class PhoneVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.phone,
    }
  }

  componentDidMount() {
    if (this.props.symbol === '') {
      this.props.goTo('/quotes')
    } else {
      this.gaViews()
    }
  }

  gaViews = () => {
    ReactGA.event({
      category: 'PhoneVer1',
      action: 'Views',
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (isValidNumber(this.state.value)) {
      this.props.verificatePhoneStart(this.state.value)
    }
    this.gaSend()
    return false
  }

  gaClose = () => {
    ReactGA.event({
      category: 'PhoneVer1',
      action: 'Close',
    })
  }

  gaSend = () => {
    ReactGA.event({
      category: 'PhoneVer1',
      action: 'Send',
    })
  }

  handleClose = () => {
    this.gaClose()
    this.props.setVisible(false)
    this.props.receiveQuotesEnd()
    this.props.sendEventStart({ event_name: 'PhoneVerification.Close', meta: '' })
    this.props.goTo('/')
  }


  render() {
    const { value } = this.state

    return (
      <div className='quote-modal_verification-container'>
        <div className='d-flex justify-content-between align-items-center'>
          {this.props.operation === '' ?
            <Link to='/quotes/' href='/quotes/' className='quote_back-btn'>
              <span className='quote-modal_chevron'>&#8249;</span>
            </Link> :
            <Link
              to={`/order/${this.props.symbol}/${this.props.operation}`}
              href={`/order/${this.props.symbol}/${this.props.operation}`}
              className='quote_back-btn'
            >
              <span className='quote-modal_chevron'>&#8249;</span>
            </Link>
          }
          <h3 className='font-weight-bold text-center mb-1'>Claim your potential profit</h3>
          <Button
            color='link'
            className='quote_close-btn p-0'
            onClick={this.handleClose}
          >
            ✕
          </Button>
        </div>
        <p className='px-4 pt-2'>Verify your phone and we will call you when your asset reaches boundaries</p>
        <hr />
        <Row>
          <Col
            md={{
              size: 6,
              offset: 3,
            }}
            xs={{
              size: 10,
              offset: 1,
            }}
          >
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <PhoneInput
                  autoFocus
                  className='mt-3 mb-4'
                  placeholder='Enter phone number'
                  value={value}
                  onChange={v => this.setState({ value: v })}
                  error={value ? (isValidNumber(value) ? undefined : 'Invalid phone number') : ''} // eslint-disable-line
                  indicateInvalid
                />
              </FormGroup>
              <Button
                className='confirm-btn btn-lg btn-block'
              >
                Send Verification Code
              </Button>
            </Form>

          </Col>
        </Row>
        <Row>
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
            xs={{
              size: 10,
              offset: 1,
            }}
          >
            <p
              className='text-center verify-phone_text my-3'
            >
              Clicking above will send a text message with a Verification Code to your phone
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

PhoneVerification.defaultProps = {
  symbol: 'EURUSD',
  operation: 'sell',
}

PhoneVerification.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      symbol: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  symbol: PropTypes.string,
  operation: PropTypes.string,
  phone: PropTypes.string.isRequired,
  verificatePhoneStart: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  receiveQuotesEnd: PropTypes.func.isRequired,
  sendEventStart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  symbol: state.minitrader.order.data.symbol,
  operation: state.minitrader.order.data.operation,
  phone: state.minitrader.user.phone,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo,
  verificatePhoneStart,
  setVisible,
  receiveQuotesEnd,
  sendEventStart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(PhoneVerification))
