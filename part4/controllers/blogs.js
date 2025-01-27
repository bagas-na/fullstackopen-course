const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    logger.error('error fetching blogs from database.')
    next(error)
  }
})

blogsRouter.post('/',
  middleware.userExtractor,
  async (request, response, next) => {
    const contentType = request.get('Content-type')
    if (!contentType.includes('application/json')) {
      response.status(415).send({
        error: 'Unsupported Media Type',
        message: `Expected Content-Type: application/json, but received ${contentType}`
      })
      return
    }

    if (request.token === null) {
      response.status(401).json({ error: 'token required' })
      return
    }

    if (request.body.title === undefined || request.body.url === undefined) {
      response.status(400).send({
        error: 'Unexpected json format',
        message: 'json must contain entries \'title\', \'url\'.'
      })
      return
    }

    try {
      const { title, author, url, likes } = request.body
      const user = await User.findById(request.user.id)
      const blog = new Blog({ title, author, url, likes, user: user.id })
      const savedBlog = await blog.save()

      const blogUser = await User.findById(user.id)
      blogUser.blogs = blogUser.blogs.concat(savedBlog.id)

      await blogUser.save()
      response.status(201).json(savedBlog)
    } catch (error) {
      logger.error('error saving blog to database.')
      next(error)
    }
  })

blogsRouter.delete('/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const blogId = request.params.id

    if (request.token === null) {
      response.status(401).json({ error: 'token required' })
      return
    }

    try {
      const blog = await Blog.findById(blogId)
      if (blog.user.toString() === request.user.id) {
        const result = await Blog.findByIdAndDelete(blogId)
        response.status(200).json(result)
      } else {
        response.status(401).json({ error: 'unauthorized' })
      }

    } catch (error) {
      logger.error(`error deleting blog with id ${blogId} from database.`)
      next(error)
    }
  })

blogsRouter.put('/:id',
  middleware.userExtractor,
  async (request, response, next) => {
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