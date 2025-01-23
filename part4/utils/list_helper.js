const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return { title: '', author: '', likes: 0 }

  const topBlog = blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav, blogs[0])

  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  let authFreq = new Map()

  for (const blog of blogs) {
    if (authFreq.has(blog.author)) {
      authFreq.set(blog.author, authFreq.get(blog.author) + 1)
    } else {
      authFreq.set(blog.author, 1)
    }
  }

  let author = ''
  let maxFreq = 0

  for (const [key, value] of authFreq.entries()) {
    if (value > maxFreq) {
      author = key
      maxFreq = value
    }
  }

  return {
    author,
    blogs: maxFreq,
  }
}

const mostLikes = (blogs) => {
  let authLikes = new Map()

  for (const blog of blogs) {
    if (authLikes.has(blog.author)) {
      authLikes.set(blog.author, authLikes.get(blog.author) + blog.likes)
    } else {
      authLikes.set(blog.author, blog.likes)
    }
  }

  let author = ''
  let maxLikes = 0

  for (const [key, value] of authLikes.entries()) {
    if (value > maxLikes) {
      author = key
      maxLikes = value
    }
  }

  return {
    author,
    likes: maxLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}