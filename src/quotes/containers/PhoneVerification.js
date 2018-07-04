import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Button, Form, FormGroup } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'
import { isValidNumber } from 'libphonenumber-js'
import { Link } from 'react-router-dom'
import { goTo } from '../../common/actions/goTo'
import HocModal from '../HOC/HocModal'
import { verificatePhoneStart } from '../actions/verificatePhone'


class PhoneVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      // flag: false,
    }
  }

  // handleChange = (value) => {
  //   this.setState({
  //     value: value !== undefined ? value : '',
  //     flag: true,
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.setState({ flag: true })
    // if (this.state.value && this.state.value.trim() !== '') {
    //   this.props.goTo('/quotes/code-verification')
    // }
    // if (this.state.value && this.state.value.trim() !== '')
    if (isValidNumber(this.state.value)) {
      this.props.verificatePhoneStart(this.state.value)
      // this.props.goTo('/quotes/code-verification')
    }
    return false

    // const num = this.state.value.trim()
    // const pattern = /^\+?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{5})$/g
    // const res = num.search(pattern)
    // if (res === -1) {
    //   this.setState({ invalid: true })
    // } else {
    //   this.setState({ invalid: false })
    // this.props.goTo('/quotes/code-verification')
    // }
    // return false
  }

  // handleError = () => {
  //   // console.log(this.state.value)
  //   if (this.state.flag) {
  //     return (this.state.value && isValidNumber(this.state.value))
  //     // return (value && isValidNumber(value) ? undefined : 'Invalid phone number')
  //   }

  //   return true

  //   // this.state.flag ? (value && isValidNumber(value) ? undefined : 'Invalid phone number') : ''
  // }

  // handleClick = () => {
  //   this.props.verificatePhoneStart(this.state.value)
  // }


  render() {
    const { value } = this.state
    return (
      <div>
        <div className='d-flex justify-content-between'>
          {this.props.operation === undefined ?
            <Link to='/quotes/list' href='/quotes/list' className='quote_back-btn'>
              <i className='fa fa-chevron-left' />
            </Link> :
            <Link
              to={`/quotes/list/${this.props.symbol}/${this.props.operation}`}
              href={`/quotes/list/${this.props.symbol}/${this.props.operation}`}
              className='quote_back-btn'
            >
              <span className='quote-modal_chevron'>&#8249;</span>
            </Link>
          }
          <h3 className='font-weight-bold text-center mb-3'>Verify your Phone</h3>
          <Link
            to='/quotes'
            href='/quotes'
            className='quote_close-btn'
          >
            ✕
          </Link>
        </div>
        <p className='px-4'>And we let you know when your Asset reached profile / lost boundaries</p>
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
                  // onChange={() => this.handleChange(value)}
                  onChange={v => this.setState({ value: v })}
                  // error={(x) => (this.handleError(x) ? '' : 'invalid')(value)}
                  error={value ? (isValidNumber(value) ? undefined : 'Invalid phone number') : ''} // eslint-disable-line
                  indicateInvalid
                />
              </FormGroup>
              <Button
                // onClick={this.handleClick}
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
  symbol: 'ALCOA',
  operation: 'sell',
}

PhoneVerification.propTypes = {
  // goTo: PropTypes.func.isRequired,
  symbol: PropTypes.string,
  operation: PropTypes.string,
  verificatePhoneStart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  symbol: state.quotes.order.data.symbol,
  operation: state.quotes.order.data.operation,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goTo,
  verificatePhoneStart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(PhoneVerification))
