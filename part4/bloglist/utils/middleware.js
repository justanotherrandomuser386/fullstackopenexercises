const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name == 'MongoServerError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name) {
    return response.status(400).json({
      error: error.message
    })
  }
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  request.token = authorization && authorization.startsWith('Bearer') 
    ? request.token = authorization.replace('Bearer ', '')
    : null
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = await jwt.decode(request.token, process.env.JWT_SECRET)
    const user = decodedToken !== null
      ? await User.findOne({ username:decodedToken.username })
      : null
    request.user = user === null
      ? null
      : user._id
    if (request.user === null) {
      throw new Error('Unauthorized')
    }

    next()
  } catch(exception) {
    next(exception)
  }
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}
