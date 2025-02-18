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
    console.error('Error populating users database with mocks', error.message)
  }

  // Populate blog in database before tests
  try {
    const usersDocument = await User.find({})
    const users = usersDocument.map(user => user.toJSON())

    const mockBlogs = helper.initialBlogs.slice(0, 10)

    // Use for loop to avoid racing condition in concatenating blogs of the same user
    for (let blog of mockBlogs) {
      const randIndex = Math.floor(Math.random() * (users.length + 1))
      const randLikes = Math.floor(Math.random() * Math.random() * 100)
      const blogObject = new Blog({ ...blog, likes: randLikes, user: users[randIndex].id })
      const savedBlog = await blogObject.save()

      const blogUser = await User.findById(users[randIndex].id)
      blogUser.blogs = blogUser.blogs.concat(savedBlog._id)
      await blogUser.save()
    }

  } catch (error) {
    console.error('Error populating blogs database with mocks', error.message)
  }

  response.status(204).end()
})

router.post('/populate-with-comments', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Populate user in database with mocks
  try {
    const createUserPromisesArray = helper.initialUsers.map(user =>
      createUserPromise(user.username, user.name, user.password))

    await Promise.all(createUserPromisesArray)
  } catch (error) {
    console.error('Error populating users database with mocks', error.message)
  }

  // Populate blog in database with mocks (with comments)
  try {
    const usersDocument = await User.find({})
    const users = usersDocument.map(user => user.toJSON())

    const mockBlogs = helper.initialBlogs.slice(0, 10)
    const mockComments = helper.mockComments

    const randInt = (maxInt) => Math.floor(Math.random() * (maxInt + 1))

    // Generate an array of [number of comments] for each blog
    const commentCounts = Array.from({ length: mockBlogs.length }, () => randInt(6))

    const mockBlogsWithComments = mockBlogs.map((blog, index) => {
      const comments = []
      for (let i = 0; i < commentCounts[index]; i++) {
        let newComment = mockComments[randInt(mockComments.length - 1)]

        while(comments.includes(newComment)) {
          newComment = mockComments[randInt(mockComments.length - 1)]
        }
        comments.push(newComment)
      }
      return { ...blog, comments }
    })

    console.log('mockBlogsWithComments', mockBlogsWithComments)

    // Use for loop to avoid racing condition in concatenating blogs of the same user
    for (let blog of mockBlogsWithComments) {
      const randIndex = randInt(users.length - 1)
      const randLikes = randInt(99)
      const blogObject = new Blog({ ...blog, likes: randLikes, user: users[randIndex].id })
      const savedBlog = await blogObject.save()

      const blogUser = await User.findById(users[randIndex].id)
      blogUser.blogs = blogUser.blogs.concat(savedBlog._id)
      await blogUser.save()
    }

  } catch (error) {
    console.error('Error populating blogs database with mocks', error.message)
  }

  response.status(204).end()
})

module.exports = router