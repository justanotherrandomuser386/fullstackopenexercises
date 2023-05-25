import { useState, useEffect, useRef } from 'react'
import blogsService from '../services/blogs'
import Togglable from './Togglable'

const BlogEntry = ({ token, blog, setBlogs, handleLike }) => {
  const [showFull, setShowFull] = useState(false)

  const { title, url, author, likes, user, id } = blog
  const handleViewModeChange = () => {
    setShowFull(!showFull)
  }


  const handleRemove = () => {
    if (window.confirm('remove blogs.title?')) {
      blogsService
        .removeBlog(token, blog.id)
        .then(() => {
          blogsService
            .getBlogs(token)
            .then(blogs => {
              setBlogs(blogs)
            })
        })
    }
  }
 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!showFull) {
    return (
      <div style={blogStyle}>
        <p className='title'>Title: {title}</p>
        <p className='author'>Author: {author}</p>
        <button className='showAllButton' onClick={handleViewModeChange}>show</button>
      </div>
    )

  } else {
    return (
      <div style={blogStyle} className='blogEntry'>
        <p className='title'>Title: {title}</p>
        <p className='author'>Author: {author}</p>  
          <button className='showAllButton' onClick={handleViewModeChange}>hide</button>
        
        <p className='url'>{url}</p>
        <p>likes {likes} <button className='likes' onClick={() => handleLike(blog)}>like</button></p>
        <p className='user'>{user.username}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    )
  }
}

const AddBlogForm = ({ token, blogs, setBlogs, setNotification, handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlogFormRef = useRef()

  if (token === '') return null

  return (
    <Togglable buttonLabel='add blog' ref={addBlogFormRef}>
      <form onSubmit={(event) => handleCreateBlog(event, title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs, setNotification, addBlogFormRef)}>
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
        <button type='submit' className='createBlog'>create</button>
      </form>
    </Togglable>
  )
}

const Blogs = ({ token, setNotification }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {blogsService
    .getBlogs(token)
    .then(blogs => {
      setBlogs(blogs)
    })}, [token])

  const handleLike = (blog) => {
    blogsService
      .updateBlog(token, blog)
      .then(() => {
        blogsService
          .getBlogs(token)
          .then(blogs => {
            setBlogs(blogs)
          })
      })
  }

  const handleCreateBlog = (event, title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs, setNotification, addBlogFormRef) => {
    event.preventDefault()
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
      .catch(exception => {
        setNotification({
          message: `${exception.response.data.error}`,
          style: 'error'
        })
      })
  }


  

  return (
    <div>
      <AddBlogForm token={token} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} handleCreateBlog={handleCreateBlog}/>
      <h2>Blogs</h2>
      {blogs.length > 0 && blogs.map(blog => {
        return (
          <BlogEntry key={blog.id} token={token} blog={blog} setBlogs={setBlogs} handleLike={handleLike}/>
        )
      })}

    </div>
  )

}

export default {
  Blogs, 
  BlogEntry,
  AddBlogForm,
}
