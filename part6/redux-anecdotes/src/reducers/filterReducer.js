export const changeFilter = (filter) => {
  return {
    type: 'FILTER',
    payload:  filter 
  }
}

const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
 
  switch (action.type) {
    case 'FILTER': 
      return action.payload
    default:
      return state
  }
}


export default filterReducer
