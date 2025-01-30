import { expect, test } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
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

    const passwordField =  page.getByLabel(/password/i)
    await expect(passwordField).toBeVisible()
  })
})