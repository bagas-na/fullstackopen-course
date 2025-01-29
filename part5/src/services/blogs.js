import axios from 'axios';
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const incrementLike = async (id) => {
  console.log(`Increment like for blog ${id}`)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}/likes`, undefined, config )
  console.log('response', response)
  return response.data
}

export default { getAll, create, update, setToken, incrementLike }