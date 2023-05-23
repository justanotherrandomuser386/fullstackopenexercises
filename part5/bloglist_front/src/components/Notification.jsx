const Notification = ({ message, style, setNotification }) => {
  if (message === '') {
    return null
  }
  setTimeout(() => {
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
