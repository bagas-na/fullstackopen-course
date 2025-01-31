import { expect, test } from '@playwright/test'
import { loginWith } from './test_helper'

const frontEndUrl = 'http://localhost:5173'
const backEndUrl = 'http://localhost:3003'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(frontEndUrl)
  })

  test('Login form is shown', async ({ page }) => {
    const header = page.getByText('Log in to Application')
    await expect(header).toBeVisible()

    const usernameLabel = page.getByText('username')
    await expect(usernameLabel).toBeVisible()

    const passwordLabel = page.getByText('password')
    await expect(passwordLabel).toBeVisible()

    const loginButton = page.getByText('login')
    await expect(loginButton).toBeVisible()

    const usernameField = page.getByLabel(/username/i)
    await expect(usernameField).toBeVisible()

    const passwordField = page.getByLabel(/password/i)
    await expect(passwordField).toBeVisible()
  })

  test.describe('Login', () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post(`${frontEndUrl}/api/testing/reset`)
      await request.post(`${backEndUrl}/api/users`, {
        data: {
          username: 'unclebob',
          name: 'Robert Martin',
          password: 'agile'
        }
      })

      await page.goto('http://localhost:5173')
    })
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'unclebob', 'agile')
      await expect(page.getByText(/successfully logged in/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'unclebob', 'scrum')
      await expect(page.getByText(/wrong credentials!/i)).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await page.goto(frontEndUrl)
      loginWith(page, 'unclebob', 'agile')
    })

    test('a new blog can be created and is visible in the list of blogs', async ({ page }) => {
      const newBlogButton = page.getByText('new blog')
      await newBlogButton.click()


      const titleField = page.getByLabel(/title/i)
      await titleField.fill('TDD harms architecture')
      const authorField = page.getByLabel(/author/i)
      await authorField.fill('Robert C. Martin')
      const urlField = page.getByLabel(/url/i)
      await urlField.fill('http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html')

      const createButton = page.getByText('create')
      await createButton.click()

      await expect(page.getByText(/successfully added/i)).toBeVisible()
      await expect(page.getByText('TDD harms architecture - Robert C. Martin')).toBeVisible()
    })

    test('the blog can be liked', async ({ page }) => {
      const blogParagraph = page.getByText('TDD harms architecture - Robert C. Martin')
      const blogDiv = page.getByRole('article').filter({ has: blogParagraph })

      const viewButton = blogDiv.getByRole('button', { name: 'view' })
      await viewButton.click()

      await expect(blogDiv.getByText('likes: 0')).toBeVisible()
      const likeButton = blogDiv.getByRole('button', { name: 'like' })
      await likeButton.click()

      await expect(blogDiv.getByText('likes: 1')).toBeVisible()
    })

    test('the same blog can be deleted', async ({ page }) => {
      const blogParagraph = page.getByText('TDD harms architecture - Robert C. Martin')
      const blogDiv = page.getByRole('article').filter({ has: blogParagraph })

      const viewButton = blogDiv.getByRole('button', { name: 'view' })
      await viewButton.click()

      const removeButton = blogDiv.getByRole('button', { name: 'remove' })
      page.on('dialog', dialog => dialog.accept())
      await removeButton.click()

      await expect(page.getByText('TDD harms architecture - Robert C. Martin')).not.toBeVisible()
    })
  })

})

// test.describe('Blog app with already filled database', () => {
//   test.beforeAll(async ({ page, request }) => {
//     await request.post(`${frontEndUrl}/api/testing/populate`)

//     // Register a new user
//     await request.post(`${backEndUrl}/api/users`, {
//       data: {
//         username: 'torvalds',
//         name: 'Linus Torvalds',
//         password: 'justforfun'
//       }
//     })
//   })

//   test.beforeEach(async ({ page, request }) => {
//     await page.goto(frontEndUrl)
//     loginWith(page, 'torvalds', 'justforfun')

//     // Open details for each blog
//   })

//   test('all blogs have disabled delete button', async ({ page }) => {
//     expect(true).toBeTruthy()
//   })

//   test('disabled delete button does not work',async ({ page }) => {
//     expect(true).toBeTruthy()
//   })

//   test('added blog can be deleted',async ({ page }) => {
//     expect(true).toBeTruthy()
//   })
// })