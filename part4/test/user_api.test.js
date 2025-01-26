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

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

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

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await mongoose.connection.close()
})