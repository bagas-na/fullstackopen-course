const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3
  },
  author: {
    type: String,
    required: true,
    minLength: 3
  },
  url: {
    type: String,
    default: (blog) => `/blog/${encodeURI(blog.author.toLowerCase())}-${encodeURI(blog.title.toLowerCase())}`
  },
  likes: {
    type: Number,
    default: 0,
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;