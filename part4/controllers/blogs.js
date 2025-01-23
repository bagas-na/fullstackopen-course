const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    logger.error('error fetching blogs from database.')
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const contentType = request.get('Content-type')

  if (!contentType.includes('application/json')) {
    response.status(415).send({
      error: 'Unsupported Media Type',
      message: `Expected Content-Type: application/json, but received ${contentType}`
    })
    return
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).send({
      error: 'Unexpected json format',
      message: 'json must contain entries {title: ..., url: ...}'
    })
    return
  }

  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
    return
  } catch (error) {
    logger.error('error saving blog to database.')
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id

  try {
    const result = await Blog.findByIdAndDelete(blogId)
    response.status(200).json(result)
  } catch (error) {
    logger.error(`error deleting blog with id ${blogId} from database.`)
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const contentType = request.get('Content-type')

  if (!contentType.includes('application/json')) {
    response.status(415).send({
      error: 'Unsupported Media Type',
      message: `Expected Content-Type: application/json, but received ${contentType}`
    })
    return
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).send({
      error: 'Unexpected json format',
      message: 'json must contain entries {title: ..., url: ...}'
    })
    return
  }

  const blogId = request.params.id
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  try {
    const result = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true })
    response.status(200).json(result)
  } catch (error) {
    logger.error('error updating blog to database')
    next(error)
  }
})


module.exports = blogsRouter