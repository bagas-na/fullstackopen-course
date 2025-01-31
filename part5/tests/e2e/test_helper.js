const loginWith = async (page, username, password)  => {
  const usernameField = page.getByLabel(/username/i)
  await usernameField.fill(username)
  const passwordField = page.getByLabel(/password/i)
  await passwordField.fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByRole('textbox').fill(content)
  await page.getByRole('button', { name: 'save' }).click()
}

export { createNote, loginWith }
