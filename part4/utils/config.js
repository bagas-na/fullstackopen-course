require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV

const MONGODB_URI = NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT,
  NODE_ENV
}