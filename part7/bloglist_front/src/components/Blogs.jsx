import { useState, useEffect, useRef, useContext } from 'react'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import NotificationContext from '../NotificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const BlogEntry = ({ token, blog, setBlogs, handleLike, handleRemove, user }) => {
  const [showFull, setShowFull] = useState(false)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const { title, url, author, likes, id } = blog
  const bUser = blog.user
  const handleViewModeChange = () => {
    setShowFull(!showFull)
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
            ? <button id="removeButton" onClick={() => handleRemove(blog)}>remove</button>
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
  

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(blogsService.addBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notificationDispatch({
        type:'NOTIFY', 
        payload: `blog ${newBlog.title} added`
      })
    }
  })
  const updateBlogMutation = useMutation(blogsService.updateBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(updatedBlog))
      notificationDispatch({
        type:'NOTIFY', 
        payload: `blog ${updatedBlog.title} voted`
      })

    }
  })
  const removeBlogMutation = useMutation(blogsService.removeBlog, {
    onSuccess: () => {

    },
    onError: (error) => {
      notificationDispatch({type: 'NOTIFY', 
      payload:{
      message: `${error.response.data.error}`,
      style: 'error'
    }})

    }
  })

  if (token === undefined)
  {
    return <div>login first</div>
  }
  
  blogsService.setToken(token)
  const blogsQ = useQuery(
    'blogs',
    () => blogsService.getBlogs()
  )
  
  if (blogsQ.isLoading) {
    return <div>loading</div>  
  }
  
  const handleCreateBlog = (event, title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs, notificationDispatch, addBlogFormRef) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes:0
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    addBlogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(newBlog)
  }

  const handleLike = (blog) => {
    updateBlogMutation.mutate(blog)
  }
  
  const handleRemove = (blog) => {
    if (window.confirm('remove blogs.title?')) {
      console.log('handleRemove', blog)
      removeBlogMutation.mutate(blog.id)    
  
    }
  }

  const blogs = blogsQ.data

  console.log('post blogQ', blogsQ)
  const setBlogs = () => {} 
  console.log('pre return ') 

  return (
    <div>
      <AddBlogForm token={token} blogs={blogs} setBlogs={setBlogs} handleCreateBlog={handleCreateBlog}/>
      <h2>Blogs</h2>
      {blogs.length > 0 && blogs.map(blog => {
        return (
          <BlogEntry key={blog.id} token={token} blog={blog} setBlogs={setBlogs} handleRemove={handleRemove} handleLike={handleLike} user={user}/>
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
