import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Blog, BlogForm } from './Blogs'

test('renders blog title and author but no url or likes by default', () => {
  const user = {
    name: 'admin',
    username: 'root',
  }

  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https: //reactpatterns.com/',
    likes: 14,
    user: {
      username: 'root',
      name: 'admin',
      id: '6795fe7d59a4fa052e636aa8',
    },
    id: '6795feda59a4fa052e636ab3',
  }

  const incrementLike = vi.fn()
  const removeBlog = vi.fn()

  const { container } = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`)
  expect(screen.queryByRole('button', { hidden: true, name: 'view' })).toBeDefined()
  expect(screen.queryByRole('button', { hidden: true, name: 'hide' })).toBeNull()
})

test('renders url and likes when "view" button has been clicked', async () => {
  const user = {
    name: 'admin',
    username: 'root',
  }

  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 14,
    user: {
      username: 'root',
      name: 'admin',
      id: '6795fe7d59a4fa052e636aa8',
    },
    id: '6795feda59a4fa052e636ab3',
  }

  const incrementLike = vi.fn()
  const removeBlog = vi.fn()

  const { container } = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  // screen.debug()

  const eventTester = userEvent.setup()
  const button = container.querySelector('.viewButton')
  await eventTester.click(button)

  // screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`)

  expect(screen.queryByRole('button', { hidden: true, name: 'view' })).toBeDefined()
  expect(screen.queryByRole('button', { hidden: true, name: 'hide' })).toBeDefined()
  expect(screen.queryByRole('paragraph', { hidden: true, name: blog.url })).toBeDefined()
  expect(screen.queryByRole('paragraph', { hidden: true, name: /likes/i })).toBeDefined()
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const user = {
    name: 'admin',
    username: 'root',
  }

  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https: //reactpatterns.com/',
    likes: 14,
    user: {
      username: 'root',
      name: 'admin',
      id: '6795fe7d59a4fa052e636aa8',
    },
    id: '6795feda59a4fa052e636ab3',
  }

  const incrementLike = vi.fn()
  const removeBlog = vi.fn()

  const { container } = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  const eventTester = userEvent.setup()
  const button = container.querySelector('.viewButton')
  await eventTester.click(button)

  const likeButton = screen.queryByRole('button', { name: 'like' })
  await eventTester.click(likeButton)
  await eventTester.click(likeButton)

  expect(incrementLike.mock.calls).toHaveLength(2)
})

test('create blog form submission', async () => {
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https: //reactpatterns.com/',
  }
  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const eventTester = userEvent.setup()
  const newBlogButton = screen.getByRole('button', { name: /new blog/i })
  await eventTester.click(newBlogButton)

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const submitButton = screen.getByRole('button', { name: 'create' })

  await eventTester.type(titleInput, newBlog.title),
  await eventTester.type(authorInput, newBlog.author),
  await eventTester.type(urlInput, newBlog.url),
  await eventTester.click(submitButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith(newBlog.title, newBlog.author, newBlog.url)
})
