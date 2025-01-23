const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const {MONGODB_URI} = require('./utils/config')

mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)
  .then(result => logger.info("Connected to MongoDB!"))
  .catch(error => logger.error("Error connecting to MongoDB", error.message))

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoints)
app.use(middleware.errorHandler)

module.exports = app;