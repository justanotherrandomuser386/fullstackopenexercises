import { useState, useEffect, useRef } from 'react'
import blogsService from '../services/blogs'
import Togglable from './Togglable'

const BlogEntry = ({ title, author, url, likes}) => {
  return (
    <div>
      <p>Title: {title} Author: {author}</p>
    </div>
  )
}

const AddBlogForm = ({ token, blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlogFormRef = useRef()


  console.log('token', token)
  if (token === '') return null

  const handleCreateBlog = (event) => {
    event.preventDefault()
    console.log('handler')
    blogsService
      .addBlog(token, {
        title,
        author,
        url
      })
      .then((newBlog) => {
        setTitle('')
        setAuthor('')
        setUrl('')
        setBlogs(blogs.concat(newBlog))
        setNotification({
          message: `${newBlog.title} added`,
          style: 'info'
        })
        addBlogFormRef.current.toggleVisibility()

      })
      .catch(exception =>{
        setNotification({
          message: `${exception.response.data.error}`,
          style: 'error'
        })
      })
  }

  return (
    <Togglable buttonLabel='add blog' ref={addBlogFormRef}>
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
    </Togglable>
  )
}

const Blogs = ({token, setNotification}) => {
  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {blogsService
    .getBlogs(token)
    .then(blogs => {
      setBlogs(blogs)
    })}, [])

  return (
    <div>
      <AddBlogForm token={token} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
      <h2>Blogs</h2>
      {blogs.length > 0 && blogs.map(blog => {
        return (
          <BlogEntry title={blog.title} url={blog.url} author={blog.author} likes={blog.likes}/>
        )
      })}

    </div>
  )

} 

export default Blogs
