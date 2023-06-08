import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {

  const [ {message, style}, dispatch] = useContext(NotificationContext) 

  if (message === '') {
    return null
  }
  setTimeout(() => {
    dispatch(
      {
        type: 'NOTIFY',
        payload: {
                  message:'',
                  style:''
                }
      })
  }, 5000)

  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default Notification
