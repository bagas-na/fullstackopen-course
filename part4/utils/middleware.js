const logger = require('./logger')
const config = require('./config')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  if (config.NODE_ENV === 'test') {
    next()
    return
  }

  logger.info('Method: ', req.method)
  logger.info('Path  : ', req.path)
  logger.info('Body  : ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

const userExtractor = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, config.SECRET)

    if (!decodedToken.id) {
      res.status(401).json({ error: 'token invalid' })
      return
    }

    req.user = {
      id: decodedToken.id,
      username: decodedToken.username
    }

    next()
  } catch (error) {
    logger.error('invalid JWT')
    next(error)
  }
}

const unknownEndpoints = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected \'username\' to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(400).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = { requestLogger, tokenExtractor, userExtractor, unknownEndpoints, errorHandler }