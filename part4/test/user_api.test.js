const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const argon2 = require('argon2')
const app = require('../app')

const api = supertest(app)

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

describe('when there are initially a few users in db', () => {
  beforeEach(async () => {
    try {
      await User.deleteMany({})
      const createUserPromisesArray = helper.initialUsers.map(user =>
        createUserPromise(user.username, user.name, user.password))

      await Promise.all(createUserPromisesArray)
    } catch (error) {
      console.error('Error populating users database for tests initialization', error.message)
    }
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, newUser.username)
    assert.strictEqual(response.body.name, newUser.name)
    assert.strictEqual(response.body.id.length, 24)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with a same username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gatekeeper',
      name: 'Portinvartija',
      password: 'himitsu',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, 'expected \'username\' to be unique')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))

    const names = usersAtEnd.map(u => u.name)
    assert(!names.includes(newUser.name))
  })

  test('create user fails when either username or password are not given.', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWithoutUsername = {
      name: 'Engineer',
      password: 'safetythird'
    }

    const userWithoutPassword = {
      username: 'themoon',
      name: 'MoonKnight',
      // password: 'randombullcrapgo'
    }

    const responseWithoutUsername = await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const responseWithoutPassword = await api
      .post('/api/users')
      .send(userWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(responseWithoutUsername.body.error, 'Unexpected json format')
    assert.strictEqual(responseWithoutUsername.body.message, 'json must contain entries \'username\' and \'password\'')
    assert.strictEqual(responseWithoutPassword.body.error, 'Unexpected json format')
    assert.strictEqual(responseWithoutPassword.body.message, 'json must contain entries \'username\' and \'password\'')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const names = usersAtEnd.map(u => u.name)
    assert(!names.includes(userWithoutUsername.name))
    assert(!names.includes(userWithoutPassword.name))
  })

  test('create user fails when either username or password are less than 3 characters.', async () => {
    const usersAtStart = await helper.usersInDb()

    const userShortUsername = {
      username: 'en',
      name: 'Engineer',
      password: 'safetythird'
    }

    const userShortPassword = {
      username: 'themoon',
      name: 'MoonKnight',
      password: 'ra'
    }

    const responseShortUsername = await api
      .post('/api/users')
      .send(userShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const responseShortPassword = await api
      .post('/api/users')
      .send(userShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(responseShortUsername.body.error, 'Invalid username or password')
    assert.strictEqual(responseShortUsername.body.message, 'username and password must be at least 3 characters long')
    assert.strictEqual(responseShortPassword.body.error, 'Invalid username or password')
    assert.strictEqual(responseShortPassword.body.message, 'username and password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const names = usersAtEnd.map(u => u.name)
    assert(!names.includes(userShortUsername.name))
    assert(!names.includes(userShortPassword.name))
  })
})

after(async () => {
  await mongoose.connection.close()
})