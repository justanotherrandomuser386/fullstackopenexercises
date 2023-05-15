const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
      next(exception)
  }  
  
})

blogsRouter.post('/', async (request, response, next) => {
 
  if (request.user === null) {
    return response.status(401).end()
  }

  const user = await User.findById(request.user)
  let blog = {
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user,
  }
  if (blog.title === undefined || blog.url === undefined || blog.user === undefined) {
    return response.status(400).end()
  }
 
  blog = new Blog(blog)

  try {
    const result = await blog.save()
    
    user.blogs = user.blogs.concat(result._id.toString())
    await user.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    const blog = await Blog.findById(request.params.id)
    if (blog === null) {
      throw new Error('Not found')
    }
  //  console.log(`blog.user: ${blog.user}, request.user: ${request.user} `)
    if (blog.user.toString() !== request.user.toString()) {
      return response.status(403).end()
    }
    blog.deleteOne()
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {...request.body}
  try {
    const b = await Blog.findById(request.params.id)
    if (b === null) {
      response.status(404).end()
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true, context: 'query'})
    response.status(201).send(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})


module.exports = blogsRouter
