const loginWith = async (page, username, password)  => {
  const usernameField = page.getByLabel(/username/i)
  await usernameField.fill(username)
  const passwordField = page.getByLabel(/password/i)
  await passwordField.fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createBlog = async (page, title, author, url) => {
  const newBlogButton = page.getByText('new blog')
  await newBlogButton.click()

  await page.getByLabel(/title/i).fill(title)
  await page.getByLabel(/author/i).fill(author)
  await page.getByLabel(/url/i).fill(url)

  await page.getByText('create').click()
}

export { createBlog, loginWith }
