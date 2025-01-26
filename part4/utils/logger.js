const config = require('./config')

const info = (...args) => {
  if (config.NODE_ENV === 'test') {
    return
  }

  console.log(...args)
}

const error = (...args) => {
  if (config.NODE_ENV === 'test') {
    return
  }

  console.error(...args)
}

module.exports = { info, error }