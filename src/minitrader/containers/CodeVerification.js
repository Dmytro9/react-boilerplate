import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button, Form, FormGroup, Input, FormFeedback, Fade } from 'reactstrap'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { goTo } from '../../common/actions/goTo'
import { verificateCodeStart } from '../actions/verificateCode'
import HocModal from '../HOC/HocModal'
import setVisible from './../actions/setVisible'
import { receiveQuotesEnd } from './../actions/receiveQuotes'
import { sendEventStart } from './../actions/sendEvent'


class CodeVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invalid: false,
      value: '',
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
      category: 'PhoneVer2',
      action: 'Views',
    })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const code = this.state.value.trim()
    const pattern = /^[0-9]{4}$/g
    const res = code.search(pattern)
    if (res === -1) {
      this.setState({ invalid: true })
    } else {
      const payload = {
        code,
        // request_id: this.props.request_id,
        phone: this.props.phone,
      }
      this.props.verificateCodeStart(payload)
      this.setState({
        invalid: false,
        value: '',
      })
    }
    this.gaDone()
    return false
  }

  gaDone = () => {
    ReactGA.event({
      category: 'PhoneVer2',
      action: 'Done',
    })
  }

  gaClose = () => {
    ReactGA.event({
      category: 'PhoneVer2',
      action: 'Close',
    })
  }

  gaResend = () => {
    ReactGA.event({
      category: 'PhoneVer2',
      action: 'Resend',
    })
  }

  handleClose = () => {
    this.gaClose()
    this.props.setVisible(false)
    this.props.receiveQuotesEnd()
    this.props.sendEventStart({ event_name: 'CodeVerification.Close', meta: '' })
    this.props.goTo('/')
  }


  render() {
    return (
      <div className='quote-modal_verification-container'>
        <div className='d-flex justify-content-between align-items-center'>
          <Link
            to='/phone-verification/'
            href='/phone-verification/'
            className='quote_back-btn'
          >
            <span className='quote-modal_chevron'>&#8249;</span>
          </Link>
          <h3 className='font-weight-bold text-center mb-1'>Verify your Phone</h3>
          <Button
            color='link'
            className='quote_close-btn p-0'
            onClick={this.handleClose}
          >
            ✕
          </Button>
        </div >
        <p className='px-4 pt-2'>And we let you know when your Asset reached profile / lost boundaries</p>
        <hr className='mb-4' />
        <Row>
          <Col md={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
            <h5 className='quote_code-h4'>Please Enter here Code you received:</h5>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  autoFocus
                  className='text-center mt-3 py-2'
                  type='password'
                  name='code'
                  placeholder='1111'
                  value={this.state.value}
                  onChange={this.handleChange}
                  invalid={this.state.invalid}
                />
                <FormFeedback>Code must contain 4 digits</FormFeedback>
              </FormGroup>
              <Button
                className='confirm-btn btn-lg btn-block mt-4'
              >
                Continue Trading
              </Button>
            </Form>
            <Link
              to='/phone-verification/'
              href='/phone-verification/'
              className='resend-btn btn-lg btn-block my-4 text-center'
              onClick={this.gaResend}
            >
              Resend
            </Link>
          </Col>
          <Col md={12}>
            <Fade in={this.state.fadeIn} tag='h5' className='text-center mb-2' style={{ color: 'red' }}>
              {this.props.error && this.props.error}
            </Fade>
          </Col>
        </Row>
      </div>
    )
  }
}

CodeVerification.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      symbol: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  goTo: PropTypes.func.isRequired,
  verificateCodeStart: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  receiveQuotesEnd: PropTypes.func.isRequired,
  sendEventStart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  symbol: state.minitrader.order.data.symbol,
  phone: state.minitrader.phoneData.phone,
  error: state.minitrader.verification.errors,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo,
  verificateCodeStart,
  setVisible,
  sendEventStart,
  receiveQuotesEnd,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(CodeVerification))
