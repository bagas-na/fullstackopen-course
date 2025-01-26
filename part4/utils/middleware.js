const logger = require('./logger')
const config = require('./config')

const requestLogger = (req, res, next) => {
  if(config.NODE_ENV === 'test') {
    next()
    return
  }

  logger.info('Method: ', req.method)
  logger.info('Path  : ', req.path)
  logger.info('Body  : ', req.body)
  logger.info('---')
  next()
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
  }

  next(error)
}

module.exports = { requestLogger, unknownEndpoints, errorHandler }