import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
const dispatch = useDispatch()
const notification = useSelector((state) => state.notification)
  console.log(notification) 
  if (notification !== '') {
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default Notification
