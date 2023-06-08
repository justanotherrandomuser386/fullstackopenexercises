import axios from 'axios'
const baseURL = '/api/login'

const login = async (user) => {
  const response = await axios.post(baseURL, user)
  return response.data
}

export default { login }
