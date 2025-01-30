import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Blog } from './Blogs'

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
  expect(screen.queryByTestId('blog-url')).toBeNull()
  expect(screen.queryByTestId('blog-likes')).toBeNull()
})

test('renders url and likes when "view" button has been clicked', async () => {
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

  const firstRender = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  const eventTester = userEvent.setup()
  const button = firstRender.container.querySelector('.viewButton')
  await eventTester.click(button)

  const secondRender = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  // screen.debug()

  const div = secondRender.container.querySelector('.blog')
  const blogUrl = screen.getByTestId('blog-url')
  const blogLikes = screen.getByTestId('blog-likes')
  expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`)
  expect(blogUrl).toHaveTextContent(`${blog.url}`)
  expect(blogLikes).toHaveTextContent('likes: ')
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

  const firstRender = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  const eventTester = userEvent.setup()
  const viewButton = firstRender.container.querySelector('.viewButton')
  await eventTester.click(viewButton)

  const secondRender = render(
    <Blog blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog} />
  )

  // screen.debug()

  const likeButton = secondRender.container.querySelector('.likeButton')
  console.error(JSON.stringify(likeButton))
  await eventTester.click(likeButton)
  await eventTester.click(likeButton)

  expect(incrementLike.mock.calls).toHaveLength(2)
})
