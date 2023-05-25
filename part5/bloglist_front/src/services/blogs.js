import axios from 'axios'
const baseURL = '/api/blogs'


const getBlogs = async (token) => {
  const response = await axios.get(baseURL, { headers: { Authorization:  `Bearer ${token}` } })
  response.data.sort((a, b) => b.likes - a.likes)
  return response.data
}

const addBlog = async (token, blog) => {
  const response = await axios.post(baseURL, blog, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

const updateBlog = async (token, blog) => {
  const id = blog.id
  blog.likes++
  blog.user = blog.user.id
  delete blog.id
  const response = await axios.put(`${baseURL}/${id}`, blog,  { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

const removeBlog = async (token, id) => {
  const response = await axios.delete(`${baseURL}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

export default {
  getBlogs,
  addBlog,
  updateBlog,
  removeBlog,
}
