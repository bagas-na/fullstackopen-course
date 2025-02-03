import { expect, test } from '@playwright/test'
import { createBlog, loginWith } from './test_helper'

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
      await loginWith(page, 'unclebob', 'agile')
      await expect(page.getByText(/successfully logged in/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'unclebob', 'scrum')
      await expect(page.getByText(/wrong credentials!/i)).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await page.goto(frontEndUrl)
      await loginWith(page, 'unclebob', 'agile')
    })

    test('a new blog can be created and is visible in the list of blogs', async ({ page }) => {
      await createBlog(
        page,
        'TDD harms architecture',
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
      )
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

test.describe('Blog app with already filled database', () => {
  test.beforeAll(async ({ request }) => {
    await request.post(`${frontEndUrl}/api/testing/populate`)

    // Register a new user
    await request.post(`${backEndUrl}/api/users`, {
      data: {
        username: 'torvalds',
        name: 'Linus Torvalds',
        password: 'justforfun'
      }
    })
  })

  test.describe('only the user who added the blog sees the blog\'s delete button as enabled', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(frontEndUrl)
      await loginWith(page, 'torvalds', 'justforfun')

      const notification = page.getByTestId('notification')
      await notification.waitFor({ state: 'attached' })

      // await page.screenshot({ path: './success-login.png' })
      // screenshot should show a success login banner

      await notification.waitFor({ state: 'detached' })
    })

    test('all blogs have disabled delete button', async ({ page }) => {
      // await page.screenshot({ path: './blog-list-1.png' })

      // Open details for each blog
      const viewButtons = page.getByRole('button', { name: 'view', })
      const viewButtonCount = await viewButtons.count()
      expect(viewButtonCount).toStrictEqual(6)

      for (let i = 0; i < viewButtonCount; i++) {
        await viewButtons.nth(0).click()
        // 0 because 'view' button changes to 'hide', hence the 0th 'view' button
        // changes at each iteration
      }

      // await page.screenshot({ path: './blog-list-expanded-1.png' })

      // Check for remove button counts
      const enabledRemoveButtonCount = await page.getByRole('button', { name: 'remove', disabled: false }).count()
      const disabledRemoveButtonCount = await page.getByRole('button', { name: 'remove', disabled: true }).count()

      expect(enabledRemoveButtonCount).toStrictEqual(0)
      expect(disabledRemoveButtonCount).toStrictEqual(6)

    })

    test('added blog can be deleted', async ({ page }) => {
      // await page.screenshot({ path: './blog-list-2.png' })
      let blogCount = await page.getByRole('article').count()
      expect(blogCount).toStrictEqual(6)

      await createBlog(
        page,
        'Just for Fun: The Story of an Accidental Revolutionary',
        'Linus B. Torvalds',
        'https://archive.org/details/justforfun00linu'
      )

      blogCount = await page.getByRole('article').count()
      // await page.screenshot({ path: './blog-list-2-1.png' })
      expect(blogCount).toStrictEqual(7)

      // Open details for each blog
      const viewButtons = page.getByRole('button', { name: 'view' })
      const viewButtonCount = await viewButtons.count()

      for (let i = viewButtonCount - 1; i >= 0; i--) {
        await viewButtons.nth(i).click()
      }
      // await page.screenshot({ path: './blog-list-expanded-2.png' })

      const enabledRemoveButtonCount = await page.getByRole('button', { name: 'remove', disabled: false }).count()
      const disabledRemoveButtonCount = await page.getByRole('button', { name: 'remove', disabled: true }).count()

      expect(enabledRemoveButtonCount).toStrictEqual(1)
      expect(disabledRemoveButtonCount).toStrictEqual(6)

      page.on('dialog', dialog => dialog.accept())
      const removeButton = page.getByRole('button', { name: 'remove', disabled: false }).first()
      await removeButton.click()
      await removeButton.waitFor({ state: 'detached' })

      blogCount = await page.getByRole('article').count()
      expect(blogCount).toStrictEqual(6)
    })
  })

  // test('blogs are sorted according to the number of likes in descending order')
})