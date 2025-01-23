const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const argon2 = require('argon2')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

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


module.exports = usersRouter