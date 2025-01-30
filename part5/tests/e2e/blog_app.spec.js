import { expect, test } from '@playwright/test'

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
      const usernameField = page.getByLabel(/username/i)
      await usernameField.fill('unclebob')
      const passwordField = page.getByLabel(/password/i)
      await passwordField.fill('agile')

      const loginButton = page.getByText('login')
      await loginButton.click()

      await expect(page.getByText(/sucessfully logged in/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameField = page.getByLabel(/username/i)
      await usernameField.fill('unclebob')
      const passwordField = page.getByLabel(/password/i)
      await passwordField.fill('scrum')

      const loginButton = page.getByText('login')
      await loginButton.click()

      await expect(page.getByText(/wrong credentials!/i)).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeAll(async ({ request }) => {
      await request.post(`${frontEndUrl}/api/testing/reset`)
      await request.post(`${backEndUrl}/api/users`, {
        data: {
          username: 'unclebob',
          name: 'Robert Martin',
          password: 'agile'
        }
      })
    })

    test.beforeEach(async ({ page, request }) => {
      await page.goto('http://localhost:5173')

      const usernameField = page.getByLabel(/username/i)
      await usernameField.fill('unclebob')
      const passwordField = page.getByLabel(/password/i)
      await passwordField.fill('agile')

      const loginButton = page.getByText('login')
      await loginButton.click()
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

      await expect(page.getByText(/sucessfully added/i)).toBeVisible()
      await expect(page.getByText('TDD harms architecture - Robert C. Martin')).toBeVisible()
    })
  })

})