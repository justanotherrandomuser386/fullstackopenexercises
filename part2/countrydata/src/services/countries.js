import axios from "axios"

const baseURL = 'https://restcountries.com/v3.1/'
const getAllInfo = () => {
  const endpoint = 'all'
  const request = axios.get(`${baseURL}${endpoint}`)
  return request.then(response => response.data)
}

export default getAllInfo
