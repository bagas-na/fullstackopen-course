const usersRouter = require('express').Router()
const User = require('../models/user')
const argon2 = require('argon2')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response, next) => {
  const contentType = request.header('Content-Type')

  if (!contentType.includes('application/json')) {
    response.status(415).send({
      error: 'Unsupported Media Type',
      message: `Expected Content-Type: application/json, but received ${contentType}`
    })
    return
  }

  const { username, name, password } = request.body
  if (username === undefined || password === undefined) {
    response.status(400).send({
      error: 'Unexpected json format',
      message: 'json must contain entries \'username\' and \'password\''
    })
    return
  }

  if (username.length < 3 || password.length < 3) {
    response.status(400).send({
      error: 'Invalid username or password',
      message: 'username and password must be at least 3 characters long'
    })
    return
  }

  try {
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
  } catch (error) {
    logger.error('error creating user to database.')
    next(error)
  }

})

usersRouter.get('/', async (request, response, next) => {
  try {
    const user = await User.find({})
    const userJSON = user.map(user => user.toJSON())
    response.status(200).json(userJSON)
  } catch (error) {
    logger.error('error fetching users from database.')
    next(error)
  }

})


module.exports = usersRouter