import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import classname from 'classname'
import { Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { sprintf } from 'sprintf-js'
import { sendEventStart } from './../actions/sendEvent'


class Quote extends Component {
  gaAssets = (a, value) => {
    ReactGA.event({
      category: 'TradeNow',
      action: a,
      label: `${value.symbol}/${value.type}`,
    })

    this.props.sendEventStart({ event_name: 'TradeNow.Asset', meta: `${value.symbol}/${value.type}` })
  }

  handleBuy = () => {
    this.gaAssets(`Asset${this.props.row}`, {
      symbol: this.props.symbol,
      type: 'buy',
    })
  }

  handleSell = () => {
    this.gaAssets(`Asset${this.props.row}`, {
      symbol: this.props.symbol,
      type: 'sell',
    })
  }

  render() {
    return (
      <Row>
        <Col xs='2' className='align-middle trader-pair_symbol d-flex align-items-center'>
          <strong>{this.props.label}</strong>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': this.props.direction === 0,
                'trader-down': this.props.direction > 0,
                'trader-zero': this.props.direction < 0,
              }
            )}
          >
            <Link to={`/order/${this.props.symbol}/sell`} href={`/order/${this.props.symbol}/sell`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleSell}
              >
                <strong> Sell</strong><br />
                <span>{this.props.bid}</span>
              </Button>
            </Link>
          </div>
        </Col>
        <Col xs='4'>
          <div
            className={classname(
              ['my-2'],
              {
                'trader-up': this.props.direction === 0,
                'trader-down': this.props.direction > 0,
                'trader-zero': this.props.direction < 0,
              }
            )}
          >
            <Link to={`/order/${this.props.symbol}/buy`} href={`/order/${this.props.symbol}/buy`}>
              <Button
                block
                className='px-md-4'
                onClick={this.handleBuy}
              >
                <strong>Buy</strong><br />
                <span>{this.props.ask}</span>
              </Button>
            </Link>
          </div>
        </Col>
        <Col
          xs='2'
          className='align-middle text-center  trader-pair_symbol d-flex align-items-center justify-content-center'
        >
          {this.props.direction < 0 ? '' : <i
            className={classname(
              ['fa'],
              {
                'fa-caret-up': this.props.direction === 0,
                'fa-caret-down': this.props.direction > 0,
              }
            )}
          />
          }
          <strong
            className={classname(
              ['pl-1'],
              {
                'trader-up': this.props.direction === 0,
                'trader-down': this.props.direction > 0,
                'trader-zero': this.props.direction < 0,
              }
            )}
          >
            {sprintf('%.02f', Math.round((Math.random() * 100) + 1) / 100)}&#37;
          </strong>
        </Col>
      </Row>
    )
  }
}

Quote.propTypes = {
  symbol: PropTypes.string.isRequired,
  bid: PropTypes.number.isRequired,
  ask: PropTypes.number.isRequired,
  direction: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  sendEventStart: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  sendEventStart,
}, dispatch)

export default connect(null, mapDispatchToProps)(Quote)
