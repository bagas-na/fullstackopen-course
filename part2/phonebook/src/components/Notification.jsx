/* eslint-disable react/prop-types */
const Notification = ({ message, isError = false }) => {
  if (message === null) {
    return null
  }

  const className = isError ? 'error notification' : 'notification';

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification