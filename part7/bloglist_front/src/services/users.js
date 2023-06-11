import axios from 'axios'
const baseURL = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseURL).then(response => response.data)
  console.log('response', response)
  return response
}

const getUser = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`).then(response => response.data)
  return response
}

export default {
  getUsers,
  getUser,
}
