import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { receiveQuotesArrStart } from './actions/receiveQuotes'
import { checkUserStart } from './actions/checkUser'
import './style.css'
import vMinitrader from '../common/globals'
import { goTo } from '../common/actions/goTo'


class QuotesRoot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: true,
      fromStorage: false,
    }
  }

  componentDidMount() {
    this.props.receiveQuotesArrStart(this.props.symbols)
    this.props.checkUserStart(vMinitrader)
    const fromStorage = localStorage.getItem('order')
    if (fromStorage) {
      this.setState({ fromStorage: localStorage.getItem('order') })
      this.props.goTo('/')
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    ReactGA.pageview(window.location.pathname + window.location.search)
    const fromStorage = localStorage.getItem('order')

    if (this.props.userId !== 0
      && this.props.visits < 2
      && this.props.visible
      && !fromStorage) {
      return this.props.children
    }

    // (this.props.funnel && this.props.funnel.indexOf('tesler') !== -1)
    // && 

    return false
    // return <BtnVisible onClick={() => this.props.setVisible(true)} />
  }
}


QuotesRoot.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  visits: PropTypes.number.isRequired,
  userId: PropTypes.number,
  funnel: PropTypes.string,
  // setVisible: PropTypes.func.isRequired,
  checkUserStart: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  receiveQuotesArrStart: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
}

const mapStateToProps = state => ({
  symbols: state.minitrader.newQuotes.symbols,
  visible: state.minitrader.visible.visible,
  visits: state.minitrader.user.visits,
  userId: state.minitrader.user.id,
  funnel: state.minitrader.user.funnel,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  receiveQuotesArrStart,
  // setVisible,
  checkUserStart,
  goTo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(QuotesRoot)
