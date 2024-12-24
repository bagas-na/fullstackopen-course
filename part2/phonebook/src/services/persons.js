import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAllPersons = () =>{
  return axios.get(baseUrl)
}

export const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject)
}

export const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}