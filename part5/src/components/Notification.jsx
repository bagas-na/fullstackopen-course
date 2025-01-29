import PropTypes from 'prop-types'

const Notification = ({ isError, message }) => {
  if (message === null) {
    return null
  }

  const className = isError ? 'error notification' : 'notification'

  return (
    <div className={className}>
      {message}
    </div>
  )
}
Notification.propTypes = {
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notification