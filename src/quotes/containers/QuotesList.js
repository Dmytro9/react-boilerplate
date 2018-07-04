import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { obj } from 'the-utils'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
// import ws from '../../socket/socket'
import HocModal from '../HOC/HocModal'
import Quote from '../components/Quote'


class QuotesList extends Component {
  componentDidMount() {
    this.gaViews()
  }

  gaClose = () => {
    ReactGA.event({
      category: 'TradeNow',
      action: 'Close',
    })
  }

  gaViews = () => {
    ReactGA.event({
      category: 'TradeNow',
      action: 'Views',
    })
  }

  gaAssets = (a) => {
    ReactGA.event({
      category: 'TradeNow',
      action: a,
    })
  }


  render() {
    const { quotes0 } = this.props
    // this.gaViews()
    let pageContent = ''

    if (this.props.loading) {
      pageContent = (
        <div className='loader'>
          <Link
            to='/quotes'
            href='/quotes'
            className='quote_close-btn'
            style={{ position: 'absolute', top: '0', right: '0' }}
          >
          ✕
          </Link>
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
                <h3 className='font-weight-bold'>Trending Now</h3>
                <Link
                  to='/quotes'
                  href='/quotes'
                  className='quote_close-btn'
                  onClick={this.gaClose}
                >
                  ✕
                </Link>
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className='font-weight-bold'>Follow our most experienced traders:</p>
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
              {this.props.symbols.map(({ symbol, label }, i) => (obj.get(quotes0, symbol, false) ?
                <Quote
                  key={quotes0[symbol].symbol}
                  row={i + 1}
                  label={label}
                  {...quotes0[symbol]}
                />
                  : null
              ))}
            </Container>
          </div>
        </React.Fragment>
      )
    }

    return pageContent
  }
}

QuotesList.propTypes = {
  quotes0: PropTypes.shape({
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
}


const mapStateToProps = state => ({
  // quotes: state.quotes.newQuotes.quotes,
  quotes0: state.quotes.newQuotes.quotes0,
  loading: state.quotes.newQuotes.isLoading,
  symbols: state.quotes.newQuotes.symbols,
})

export default connect(mapStateToProps)(HocModal(QuotesList))
