import { useState, useEffect, useRef, useContext } from 'react'
import blogsService from '../services/blogs'
import Togglable from './Togglable'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogs from '../services/blogs'
import { Link, useParams } from 'react-router-dom'

const BlogEntry = ({ handleLike, handleRemove }) => {
  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  
  const id = useParams().id
  const blog = queryClient.getQueryData('blogs').filter(b => b.id === id)[0] 
  console.log('Blog entry', blog, id)

  const { title, url, author, likes } = blog
  const bUser = blog.user

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

    console.log('user: ',user)
    console.log('bUser: ', bUser)
    return (
      <div  style={blogStyle} className='blogEntry'>
        <p id='entryTitle' className='title'>Title: {title}</p>
        <p id='entryAuthor' className='author'>Author: {author}</p>  
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

const Blogs = () => {
  
  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const token = user !==  '' ? user.token : ''  
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
      queryClient.setQueryData('blogs', blogs.filter(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      notificationDispatch({
        type:'NOTIFY', 
        payload: `blog ${updatedBlog.title} voted`
      })
    }
  })

  const removeBlogMutation = useMutation(blogsService.removeBlog, {
    onSuccess: () => {},
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
      <li>
      {blogs.length > 0 && blogs.map(blog => {
        return (
          <ul><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ul>
        )
      })}
      </li>
    </div>
  )

}

export default {
  Blogs, 
  BlogEntry,
  AddBlogForm,
}
