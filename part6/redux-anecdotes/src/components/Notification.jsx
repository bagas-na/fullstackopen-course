import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.length > 0 ? 'block': 'none'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification