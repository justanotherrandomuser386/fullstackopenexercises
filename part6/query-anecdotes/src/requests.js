import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = () => 
  axios.get(baseUrl).then(response => response.data)

const createAnecdote = (anecdote) =>
  axios.post(baseUrl, anecdote).then(response => response.data)

const updateAnecdote = (anecdote) => {
  return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(response => response.data)
}

export {
  getAll,
  createAnecdote,
  updateAnecdote,
}
