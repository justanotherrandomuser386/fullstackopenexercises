const express = require('express')
const app = express()

const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)
  .then(() =>{
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to Mongodb:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
