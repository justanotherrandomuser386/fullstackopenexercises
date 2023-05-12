const express = require('express')
const app = express()

const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.connect(config.MONGODB_URI)
  .then(() =>{
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to Mongodb:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

module.exports = app
