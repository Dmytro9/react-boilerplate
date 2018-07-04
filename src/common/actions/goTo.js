import { go } from 'react-router-redux'
// import { push, go } from 'react-router-redux'

export const goTo = (url, timeout = 0) => dispatch => Promise.resolve()
  .then(() => setTimeout(() => dispatch(go(url)), timeout))

export default goTo
