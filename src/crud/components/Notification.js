import React from 'react'
import PropTypes from 'prop-types'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { notification } from '../models'

class Notification extends React.Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape(notification.propTypes)).isRequired,
    clearNotification: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    nextProps.notifications.map((i) => {
      switch (i.type) {
        case 'info':
          NotificationManager.info(i.message)
          break
        case 'success':
          NotificationManager.success(i.message)
          break
        case 'warning':
          NotificationManager.warning(i.message, 'Close after 3000ms', 3000)
          break
        case 'error':
          NotificationManager.error(i.message, 'Close!', 5000)
          break
        default:
          break
      }
      setTimeout(() => this.props.clearNotification(i.id), 0)
      return true
    })
  }

  render() {
    return (
      <div>
        <NotificationContainer />
      </div>
    )
  }
}

export default Notification
