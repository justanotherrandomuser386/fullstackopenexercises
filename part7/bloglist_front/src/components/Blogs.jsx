import { useState, useEffect, useRef, useContext } from 'react'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import NotificationContext from '../NotificationContext'

const BlogEntry = ({ token, blog, setBlogs, handleLike, user }) => {
  const [showFull, setShowFull] = useState(false)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const { title, url, author, likes, id } = blog
  const bUser = blog.user
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
        .catch(exception => {
          notificationDispatch({type: 'NOTIFY', 
          payload:{
          message: `${exception.response.data.error}`,
          style: 'error'
        }})
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
      <div className='blogEntry' style={blogStyle}>
        <p className='title'>Title: {title}</p>
        <p className='author'>Author: {author}</p>
        <p id='entryLikes'>likes {likes}</p>
        <button id='entryShow' className='showAllButton' onClick={handleViewModeChange}>show</button>
      </div>
    )

  } else {
    console.log('user: ',user)
    console.log('bUser: ', bUser)
    return (
      <div  style={blogStyle} className='blogEntry'>
        <p id='entryTitle' className='title'>Title: {title}</p>
        <p id='entryAuthor' className='author'>Author: {author}</p>  
          <button id='entryHide' className='showAllButton' onClick={handleViewModeChange}>hide</button>
        
        <p id='entryUrl' className='url'>{url}</p>
        <p id='entryLikes'>likes {likes} <button id='likeButton' className='likes' onClick={() => handleLike(blog)}>like</button></p>
        <p id='user' className='user'>{bUser.username}</p>
        { user.username === bUser.username
            ? <button id="removeButton" onClick={handleRemove}>remove</button>
            : <></>
        }
      </div>
    )
  }
}

const AddBlogForm = ({ token, blogs, setBlogs, handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const addBlogFormRef = useRef()

  if (token === '') return null

  return (
    <Togglable buttonLabel='add blog' buttonId='addBlog' ref={addBlogFormRef}>
      <form onSubmit={(event) => handleCreateBlog(event, title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs, notificationDispatch, addBlogFormRef)}>
        <div>
        title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
        author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
        url:
          <input
            id='url'
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id='createBlogButton' type='submit' className='createBlog'>create</button>
      </form>
    </Togglable>
  )
}

const Blogs = ({ token, user }) => {
  const [blogs, setBlogs] = useState([])
  const [notification, notificationDispatch] = useContext(NotificationContext)
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

  const handleCreateBlog = (event, title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs, notificationDispatch, addBlogFormRef) => {
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
        notificationDispatch({type:'NOTIFY', 
          payload:{
          message: `${newBlog.title} added`,
          style: 'info'
        }})
        addBlogFormRef.current.toggleVisibility()

      })
      .catch(exception => {
        notificationDispatch({type:'NOTIFY',
          payload:{
          message: `${exception.response.data.error}`,
          style: 'error'
        }})
      })
  }


  

  return (
    <div>
      <AddBlogForm token={token} blogs={blogs} setBlogs={setBlogs} handleCreateBlog={handleCreateBlog}/>
      <h2>Blogs</h2>
      {blogs.length > 0 && blogs.map(blog => {
        console.log('listing blogs ', blog)
        return (
          <BlogEntry key={blog.id} token={token} blog={blog} setBlogs={setBlogs} handleLike={handleLike} user={user}/>
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
