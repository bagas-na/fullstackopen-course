const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')


const api = supertest(app)

beforeEach(async () => {
  try {
    await Blog.deleteMany({});

    let blogPromiseArray = helper.initialBlogs.map(blog => {
      const blogObject = new Blog(blog);
      return blogObject.save()
    })

    await Promise.all(blogPromiseArray)

  } catch (error) {
    console.error('Error initializing blog api tests', error.message)
  }
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})


test('returns correct amount of blog post', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

test('property "id" exists, and is hexadecimal of length 24', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog =>{
    assert.match(blog.id, /^[a-f\d]{24}$/i)
  })
})

test('create new blog post', async () => {
  const newBlog = {
    title: "The C Programming Language (Second Edition)",
    author: "Brian Kernighan and Dennis Ritchie",
    url: "https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628"
  }

  await api.post('/api/blogs').send(newBlog).expect(201)
  
  const response = await api.get('/api/blogs')
  const length = response.body.length;
  const lastBlog = response.body[length - 1]

  assert.strictEqual(length, helper.initialBlogs.length + 1);
  assert.strictEqual(lastBlog.title, newBlog.title)
  assert.strictEqual(lastBlog.author, newBlog.author)
  assert.strictEqual(lastBlog.url, newBlog.url)
  assert.match(lastBlog.id, /^[a-f\d]{24}$/i)
})

test('default likes is 0', async () => {
  const newBlog = {
    title: "The C Programming Language (Second Edition)",
    author: "Brian Kernighan and Dennis Ritchie",
    url: "https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628"
  }

  await api.post('/api/blogs').send(newBlog).expect(201)
  
  const response = await api.get('/api/blogs')
  const length = response.body.length;
  const lastBlog = response.body[length - 1]

  assert.strictEqual(lastBlog.likes, 0);
})

test('missing title or url result in error 400', async () => {
  const newBlog = {
    title: "The C Programming Language (Second Edition)",
    author: "Brian Kernighan and Dennis Ritchie",
    url: "https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628"
  }
  const newBlogNoTitle = {
    author: "Brian Kernighan and Dennis Ritchie",
    url: "https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628"
  }
  const newBlogNoAuthor = {
    title: "The C Programming Language (Second Edition)",
    url: "https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628"
  }
  const newBlogNoUrl = {
    title: "The C Programming Language (Second Edition)",
    author: "Brian Kernighan and Dennis Ritchie",
  }

  await api.post('/api/blogs').send(newBlog).expect(201)
  await api.post('/api/blogs').send(newBlogNoTitle).expect(400)
  await api.post('/api/blogs').send(newBlogNoAuthor).expect(201)
  await api.post('/api/blogs').send(newBlogNoUrl).expect(400)
})


after(async () => {
  await mongoose.connection.close()
})