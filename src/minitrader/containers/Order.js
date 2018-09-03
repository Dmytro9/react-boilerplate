import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import { bindActionCreators } from 'redux'
import { Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import InputRange from 'react-input-range'
import { obj } from 'the-utils'
import HocModal from '../HOC/HocModal'
import { makeOrderFulfilled } from '../actions/makeOrder'
import { goTo } from '../../common/actions/goTo'
import setVisible from './../actions/setVisible'
import { receiveQuotesEnd } from './../actions/receiveQuotes'
import { sendEventStart } from './../actions/sendEvent'
import { calcprice, delta } from '../utils'
import { getRangeStart } from './../actions/getRange'

class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        min: 10,
        max: 75,
      },
    }
  }

  componentDidMount() {
    this.gaView()
  }

  gaView = () => {
    ReactGA.event({
      category: 'AssetOrder',
      action: 'Views',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  gaClose = () => {
    ReactGA.event({
      category: 'AssetOrder',
      action: 'Close',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  gaConfirm = () => {
    ReactGA.event({
      category: 'AssetOrder',
      action: 'Confirm ',
      label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
    })
  }

  // gaBack = () => {
  //   ReactGA.event({
  //     category: 'Asset',
  //     action: 'Back',
  //     label: `${this.props.match.params.symbol}/${this.props.match.params.type}`,
  //   })
  // }

  handleOperation = (type) => {
    const buy = this.props.match.params.type !== undefined && this.props.match.params.type === type
    if (buy !== true) this.props.goTo(`/order/${this.props.match.params.symbol}/${type}`)
  }

  handleChange = ({ min, max }) => {
    let mmin = 0
    let mmax = 60
    if (min > 0) {
      mmin = min > 40 ? 40 : min
    }
    if (max > 60) {
      mmax = max > 100 ? 100 : max
    }
    if (min !== this.state.value.min) {
      this.props.getRangeStart('SL')
    }
    if (max !== this.state.value.max) {
      this.props.getRangeStart('TP')
    }
    this.setState({
      value: {
        min: mmin,
        max: mmax,
      },
    })
  }

  handleClose = () => {
    this.gaClose()
    this.props.setVisible(false)
    this.props.receiveQuotesEnd()
    this.props.goTo('/')
  }

  // calculatePrice = (x, d, r = 4) => Math.round(x * (0.9990 + (d * 0.0006)) * (10 ** r)) / (10 ** r)

  render() {
    const symbol = this.props.symbols.find(s => s.symbol === this.props.match.params.symbol)
    const pair = obj.get(this.props.quotes, this.props.match.params.symbol, undefined)
    if (symbol === undefined || pair === undefined) {
      return (
        <div className='loader'>
          <Button
            color='link'
            className='quote_close-btn'
            onClick={this.handleClose}
            style={{ position: 'absolute', top: '0', right: '0' }}
          >
            ✕
          </Button>
          <div>
            Loading...
          </div>
        </div>
      )
    }
    const buy = !!(this.props.match.params.type === undefined || this.props.match.params.type === 'buy')
    const price = pair[buy ? 'ask' : 'bid']
    // const digitsString = price !== undefined ? String(price).split('.')[1] : ''
    const { digits } = pair// digitsString.length`
    const priceMin = buy ? calcprice(price, delta(this.state.value.min / 40, 'min'), digits)
      : calcprice(price, delta(((this.state.value.max - 60) / 40), 'max'), digits)

    const priceMax = buy ? calcprice(price, delta(((this.state.value.max - 60) / 40), 'max'), digits)
      : calcprice(price, delta(this.state.value.min / 40, 'min'), digits)


    return (
      <div className='quote-order_container'>
        <div className='d-flex justify-content-between align-items-center'>
          <Link to='/quotes' href='/quotes' className='quote_back-btn'>
            <span className='quote-modal_chevron'>&#8249;</span>
          </Link>
          <h3 className='font-weight-bold text-center mb-1'>
            New Order{' '}
            <span className='text-primary'>{symbol.label}</span>
          </h3>
          <Button color='link' className='quote_close-btn p-0' onClick={this.handleClose}>✕</Button>
        </div>
        <hr className='mb-5' />
        <Row>
          <Col xs='6'>
            <Button
              block
              className={!buy ? 'active-sell py-2' : 'no-active py-2'}
              onClick={() => this.handleOperation('sell')}
            >
              <strong>Sell<br /></strong>
              <span>{pair.bid}</span>
            </Button>
          </Col>
          <Col xs='6'>
            <Button
              block
              className={buy ? 'active-buy py-2' : 'no-active py-2'}
              onClick={() => this.handleOperation('buy')}
            >
              <strong> Buy</strong><br />
              <span>{pair.ask}</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <form className='form'>
              <InputRange
                draggableTrack
                maxValue={102}
                minValue={-2}
                onChange={this.handleChange}
                // onChangeComplete={value => console.log(value)}
                value={this.state.value}
              />
            </form>
            <Row>
              <Col xs='6'>
                <div>
                  <strong className='quote-modal_order-strong'>Stop Loss</strong>
                  <br />
                  {priceMin}
                </div>
              </Col>
              <Col xs='6'>
                <div className='text-right'>
                  <strong className='quote-modal_order-strong'>Take profit</strong>
                  <br />
                  {priceMax}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            md={{
              size: 6,
              offset: 3,
            }}
            xs={{
              size: 8,
              offset: 2,
            }}
          >
            <div className='my-4'>
              <Link to='/phone-verification' href='/phone-verification'>
                <Button
                  className='confirm-btn'
                  size='lg'
                  block
                  onClick={() => {
                    const data = {
                      pair,
                      priceMin: buy ? priceMin : priceMax,
                      priceMax: buy ? priceMax : priceMin,
                      operation: buy ? 'buy' : 'sell',
                      symbol: pair.symbol,
                      price: buy ? pair.ask : pair.bid,
                    }
                    this.gaConfirm()
                    this.props.makeOrderFulfilled(data)
                    this.props.sendEventStart({
                      event_name: 'TradeComplete',
                      meta: 'Operation Completed',
                    })
                  }}
                >
                  Confirm
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Order.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      symbol: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  goTo: PropTypes.func.isRequired,
  receiveQuotesEnd: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  sendEventStart: PropTypes.func.isRequired,
  makeOrderFulfilled: PropTypes.func.isRequired,
  getRangeStart: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  quotes: PropTypes.shape({
    symbol: PropTypes.string,
    timestamp: PropTypes.number,
    bid: PropTypes.number,
    ask: PropTypes.number,
    direction: PropTypes.number,
    digits: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  quotes: state.minitrader.newQuotes.quotes,
  symbols: state.minitrader.newQuotes.symbols,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  makeOrderFulfilled,
  goTo,
  setVisible,
  receiveQuotesEnd,
  sendEventStart,
  getRangeStart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(Order))
