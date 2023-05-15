const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  //console.log(request.body)
  //console.log(username, name, password)
  
  if ( !password || password.length < parseInt(process.env.MIN_PASSWORD_LENGTH)) {

    return response.status(400).json({
      error: 'password too short'
    })
  }
  try {
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
    const user = new User({
      username,
      name,
      passwordHash
    })
    
    //console.log(user)
    const result = await user.save()
    //console.log(result)
    response.status(201).send(result)

  } catch(exception) {
    next(exception)
   
  }
})

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs')
  response.status(200).json(users)
})


module.exports = usersRouter
