import axios from 'axios'

export const getBlogs = async() => {
  const { data } = await axios.get('http://localhost:5000/blog/getAll')
  return data.blogs
}

export const getListCountries = async() => {
  const { data } = await axios.get('https://countriesnow.space/api/v0.1/countries')
  return data.data
}