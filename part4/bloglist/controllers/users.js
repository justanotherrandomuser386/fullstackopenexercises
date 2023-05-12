const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  console.log(request.body)
  console.log(username, name, password)
  
  if ( !password || password.length < process.env.MIN_PASSWORD_LENGTH) {

    response.status(400).json({
      error: 'password to short'
    })
  }
  try {
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
    const user = new User({
      username,
      name,
      passwordHash
    })
    console.log('post creation/pre save')
    const result = await user.save()
    console.log('post save')
    response.status(201).send(result)

  } catch(exception) {
    next(exception)
   
  }
})

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  response.status(200).json(users)
})


module.exports = usersRouter
