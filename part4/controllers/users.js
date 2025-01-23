const usersRouter = require('express').Router()
const User = require('../models/user')
const argon2 = require('argon2')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  if (!contentType.includes('application/json')) {
    response.status(415).send({
      error: 'Unsupported Media Type',
      message: `Expected Content-Type: application/json, but received ${contentType}`
    })
    return
  }
  
  const { username, name, password } = request.body
  if (request.body.username === undefined || request.body.password === undefined) {
    response.status(400).send({
      error: 'Unexpected json format',
      message: 'json must contain entries {username: ..., password: ...}'
    })
    return;
  }

  const passwordHash = await argon2.hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  })

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const user = await User.find({})
    const userJSON = user.map(user => user.toJSON())
  } catch (error) {
    logger.error('error fetching users from database.')
    next(error)
  }
  
  response.status(200).json(userJSON)
})


module.exports = usersRouter