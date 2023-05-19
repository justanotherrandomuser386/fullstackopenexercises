import axios from 'axios'
const baseURL = '/api/blogs'


const getBlogs = async (token) => {
  const response = await axios.get(baseURL, {headers: {Authorization:  `Bearer ${token}`}})
  return response.data
}

const addBlog = async (token, blog) => {
  const response = await axios.post(baseURL, blog, {headers: {Authorization: `Bearer ${token}`}})
  return response.data
} 

export default { 
  getBlogs,
  addBlog,

}
