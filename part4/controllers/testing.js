const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const argon2 = require('argon2')
const helper = require('../test/test_helper')

const createUserPromise = async (username, name, password) => {
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

  return user.save()
}

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/populate', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Populate user in database before tests
  try {
    const createUserPromisesArray = helper.initialUsers.map(user =>
      createUserPromise(user.username, user.name, user.password))

    await Promise.all(createUserPromisesArray)
  } catch (error) {
    console.error('Error populating users database for tests initialization', error.message)
  }

  // Populate blog in database before tests
  try {
    const usersDocument = await User.find({})
    const users = usersDocument.map(user => user.toJSON())

    // Use for loop to avoid racing condition in concatenating blogs of the same user
    for (let blog of helper.initialBlogs) {
      const randIndex = Math.floor(Math.random() * users.length) % users.length
      const blogObject = new Blog({ ...blog, user: users[randIndex].id })
      const savedBlog = await blogObject.save()

      const blogUser = await User.findById(users[randIndex].id)
      blogUser.blogs = blogUser.blogs.concat(savedBlog._id)
      await blogUser.save()
    }

  } catch (error) {
    console.error('Error populating blogs database for tests initialization', error.message)
  }

  response.status(204).end()
})

module.exports = router