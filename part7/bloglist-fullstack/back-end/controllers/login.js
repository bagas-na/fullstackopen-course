const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const loginRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await argon2.verify(user.passwordHash, password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  let expiryTime = 0
  switch (config.NODE_ENV) {
  case 'production':
    expiryTime = 24 * 60 * 60
    break
  case 'development':
    expiryTime = 60 * 60
    break
  default:
    expiryTime = 5 * 60

  }

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: expiryTime })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter