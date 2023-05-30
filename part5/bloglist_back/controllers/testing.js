const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  console.log('DB reset')
  response.status(204).end()
})



module.exports=testingRouter
