const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
      next(exception)
  }  
  
})

blogsRouter.post('/', async (request, response, next) => {
  
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).end()
  }
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
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
