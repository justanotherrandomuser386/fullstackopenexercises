require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()


loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  //console.log(request.body)
  //console.log(user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(400).json({
      error: 'invalid username or password'
    })
  }
  
  const userToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userToken, process.env.JWT_SECRET)

  response
    .status(200)
    .json({
      token,
      username: user.username,
      name: user.name,
    })
})

module.exports = loginRouter
