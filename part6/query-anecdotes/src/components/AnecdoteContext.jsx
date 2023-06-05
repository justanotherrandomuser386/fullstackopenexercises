import { createContext, useReducer } from 'react'

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'NOTIFY': {
        if (action.payload !== '') {
            setTimeout(() => {notificationDispatch({ type: 'NOTIFY', payload: '' })
          }, 5000)
        }
        return action.payload
      }
      default:
        return state
    }
  }

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')


  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext
