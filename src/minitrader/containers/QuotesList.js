import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { obj } from 'the-utils'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import { bindActionCreators } from 'redux'
import HocModal from '../HOC/HocModal'
import Quote from '../components/Quote'
import setVisible from './../actions/setVisible'
import { receiveQuotesEnd } from './../actions/receiveQuotes'
import { sendEventStart } from './../actions/sendEvent'
import { goTo } from '../../common/actions/goTo'


class QuotesList extends Component {
  componentDidMount() {
    this.gaViews()
  }

  gaClose = () => {
    ReactGA.event({
      category: 'TradeNow',
      action: 'Close',
    })
    this.props.sendEventStart({ event_name: 'TradeNow.Close', meta: '' })
  }

  gaViews = () => {
    ReactGA.event({
      category: 'TradeNow',
      action: 'Views',
    })
    this.props.sendEventStart({ event_name: 'TradeNow.View', meta: '' })
  }

  gaAssets = (a) => {
    ReactGA.event({
      category: 'TradeNow',
      action: a,
    })
    this.props.sendEventStart({ event_name: 'TradeNow.Asset', meta: a })
  }

  handleClose = () => {
    this.gaClose()
    this.props.setVisible(false)
    this.props.receiveQuotesEnd()
    this.props.goTo('/')
  }

  preperQuotes = (quotes, symbols) => { 
    let buf = {}
    return symbols.reduce((acc, i) => {
      const quote = obj.get(quotes, i.symbol, undefined)
      if (quote === undefined || obj.has(buf, i.label)) return acc
      buf[i.label] = true
      return [...acc, { ...quote, label: i.label}] 
    }, [])
  }


  render() {
    const { quotes, symbols } = this.props
    let pageContent = ''
    const qs = this.preperQuotes(quotes, symbols)

    if (this.props.loading) {
      pageContent = (
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
    } else {
      pageContent = (
        <React.Fragment>
          <Row>
            <Col>
              <div className='d-flex justify-content-between'>
                <h3 className='font-weight-bold'>You won a free trade!</h3>
                <Button
                  color='link'
                  className='quote_close-btn pb-2'
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
              <p className='font-weight-bold'>Choose your free trade - 10$</p>
            </Col>
          </Row>
          <div className='trader-table'>
            <Container>
              <Row>
                <Col
                  xs='2'
                  className='bg-dark d-flex justify-content-center
                  align-items-center text-white trader-table_header py-2'
                >
                  Asset
                </Col>
                <Col
                  xs='4'
                  className='bg-dark d-flex justify-content-center
                  align-items-center text-white trader-table_header py-2'
                >
                  Bid
                </Col>
                <Col
                  xs='4'
                  className='bg-dark d-flex justify-content-center
                  align-items-center text-white trader-table_header py-2'
                >
                  Ask
                </Col>
                <Col xs='2' className='bg-dark text-white text-center trader-table_header py-2'>
                  Hourly Change
                </Col>
              </Row>
              { 
                qs.map((quote, i) => <Quote
                  key={quote.symbol}
                  row={i + 1}
                  label={quote.label}
                  {...quote}
                />)
                //this.props.symbols.map(({ symbol, label }, i) => (
              
              //   //obj.get(quotes, symbol, false) ?
              //   <Quote
              //     key={quotes[symbol].symbol}
              //     row={i + 1}
              //     label={label}
              //     {...quotes[symbol]}
              //   />
              //     : null
              // ))
            }
            </Container>
          </div>
        </React.Fragment>
      )
    }

    return pageContent
  }
}

QuotesList.propTypes = {
  quotes: PropTypes.shape({
    symbol: PropTypes.string,
    timestamp: PropTypes.number,
    bid: PropTypes.number,
    ask: PropTypes.number,
    direction: PropTypes.number,
    digits: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  symbols: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  setVisible: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  sendEventStart: PropTypes.func.isRequired,
  receiveQuotesEnd: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  quotes: state.minitrader.newQuotes.quotes,
  loading: state.minitrader.newQuotes.isLoading,
  symbols: state.minitrader.newQuotes.symbols,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setVisible,
  goTo,
  receiveQuotesEnd,
  sendEventStart,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HocModal(QuotesList))
