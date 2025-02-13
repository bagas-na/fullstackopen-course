import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const { message, isError } = notification

  if (message === '' || message === null) {
    return null
  }

  const className = isError ? 'error notification' : 'notification'

  return (
    <div className={className} role='notification' data-testid='notification'>
      {message}
    </div>
  )
}

export default Notification
