import { useState } from 'react'

const Notification = ({ message, style, setNotification }) => {
  if (message === '') {
    return null
  }
  setTimeout(() => {
    console.log('reset')
    setNotification({
      message:'',
      style:''
    })
  }, 5000)

  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default Notification
