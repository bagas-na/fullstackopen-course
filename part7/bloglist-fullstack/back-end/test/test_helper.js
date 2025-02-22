const Blog = require('../models/blog')
const User = require('../models/user')

const blogInDb = async () => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const user = await User.find({})
  return user.map(user => user.toJSON())
}

const initialBlogs =
  [
    {
      'title': 'React patterns',
      'author': 'Michael Chan',
      'url': 'https://reactpatterns.com/',
      'likes': 7
    },
    {
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      'likes': 5
    },
    {
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      'likes': 12
    },
    {
      'title': 'First class tests',
      'author': 'Robert C. Martin',
      'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      'likes': 10
    },
    {
      'title': 'TDD harms architecture',
      'author': 'Robert C. Martin',
      'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      'likes': 0
    },
    {
      'title': 'Type wars',
      'author': 'Robert C. Martin',
      'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      'likes': 2
    },
    {
      'title': 'The Zen of Python',
      'author': 'Tim Peters',
      'url': 'https://www.python.org/dev/peps/pep-0020/',
      'likes': 15
    },
    {
      'title': 'The Clean Coder',
      'author': 'Robert C. Martin',
      'url': 'https://www.unclebob.com/Article/clean-coder',
      'likes': 20
    },
    {
      'title': 'The Art of Computer Programming',
      'author': 'Donald E. Knuth',
      'url': 'https://www-cs-faculty.stanford.edu/~dk/toc/toc.html',
      'likes': 25
    },
    {
      'title': 'Design Patterns: Elements of Reusable Object-Oriented Software',
      'author': 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      'url': 'https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612',
      'likes': 18
    },
    {
      'title': 'Refactoring: Improving the Design of Existing Code',
      'author': 'Martin Fowler',
      'url': 'https://refactoring.guru',
      'likes': 22
    },
    {
      'title': 'Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation',
      'author': 'Jez Humble, David Farley',
      'url': 'https://www.amazon.com/Continuous-Delivery-Reliable-Deployment-Automation/dp/0321601912',
      'likes': 17
    },
    {
      'title': 'The Mythical Man-Month',
      'author': 'Frederick P. Brooks Jr.',
      'url': 'https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959',
      'likes': 14
    },
    {
      'title': 'Code Complete',
      'author': 'Steve McConnell',
      'url': 'https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670',
      'likes': 19
    },
    {
      'title': 'You Don\'t Know JS',
      'author': 'Kyle Simpson',
      'url': 'https://github.com/getify/You-Dont-Know-JS',
      'likes': 30
    },
    {
      'title': 'The Pragmatic Programmer',
      'author': 'Andrew Hunt, David Thomas',
      'url': 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
      'likes': 28
    },
    {
      'title': 'Clean Architecture',
      'author': 'Robert C. Martin',
      'url': 'https://www.unclebob.com/books/clean-architecture',
      'likes': 33
    },
    {
      'title': 'Introduction to Algorithms',
      'author': 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
      'url': 'https://mitpress.mit.edu/books/introduction-algorithms',
      'likes': 27
    },
    {
      'title': 'Cracking the Coding Interview',
      'author': 'Gayle Laakmann McDowell',
      'url': 'https://www.crackingthecodinginterview.com',
      'likes': 21
    }
  ]


const initialUsers = [
  {
    'username': 'root',
    'name': 'Superuser',
    'password': 'sekret'
  },
  {
    'username': 'alan_turing',
    'name': 'Alan Turing',
    'password': 'enigma'
  },
  {
    'username': 'ada_lovelace',
    'name': 'Ada Lovelace',
    'password': 'ciphertext'
  },
  {
    'username': 'donald_knuth',
    'name': 'Donald Knuth',
    'password': 'hashing'
  },
  {
    'username': 'guest',
    'name': 'Guest',
    'password': 'clandestine'
  },
  {
    'username': 'unclebob',
    'name': 'Robert Martin',
    'password': 'agile'
  }
]

const mockComments = [
  'This really helped me understand React patterns better. Thanks for the clarity!',
  'Great read! I’ll be using these design patterns in my next project for sure.',
  'TDD has been a game-changer for me. This article explained it perfectly.',
  'Had no idea how deep the concept of first-class tests could go. Awesome!',
  'Love how this article simplifies architecture. Must read for any dev.',
  'I always struggled with clean code, but this cleared a lot up. Appreciate it!',
  'Amazing breakdown of design patterns! Wish I found this sooner.',
  'Totally agree with the points on TDD. It really does affect your architecture.',
  'Refactoring is key to long-term success. This article nails it!',
  'The examples in this were super helpful. Thanks for making it easy to follow.',
  'Great job explaining the importance of type safety. Definitely applying this.',
  'I’ve been doing tests all wrong. This article was an eye-opener.',
  'This made me rethink my approach to testing. Gonna apply these tips.',
  'I liked how you connected theory to practical advice. Very useful.',
  'The advice here is spot on. A must-read for anyone coding professionally.',
  'Love how this breaks down complex topics into simple steps.',
  'Can’t believe how much I learned in one read. Thanks for sharing this.',
  'I’ve been missing some basics. This article definitely helped me out.',
  'This will totally change the way I approach testing in my projects.',
  'Such a well-written article! It really makes clean code easy to understand.',
  'The examples here are pure gold. I’ll be using them in my next sprint.',
  'TDD for the win! This article helped me see the bigger picture.',
  'Loved this post. Learned so much in a short amount of time.',
  'Great content! Really opened my eyes on testing strategies.',
  'Totally agree with the need for secure coding. Good read!',
  'I’ll be following these clean code tips from now on for sure.',
  'Love how practical and to-the-point this article is. No fluff.',
  'This was super insightful. Can’t wait to try these patterns out.',
  'Some really good points on design patterns here. I’m bookmarking this.',
  'Great intro to testing. Definitely going to explore more after reading this.',
  'I feel way more confident in my coding after reading this.'
]


module.exports = {
  initialBlogs, blogInDb, initialUsers, usersInDb, mockComments
}