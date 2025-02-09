import { useContext } from "react"
import { useNotificationValue } from "../../context/NotificationContext"


const Notification = () => {
  const message = useNotificationValue()  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: message.length > 0 ? 'block' : 'none',
  }


  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
