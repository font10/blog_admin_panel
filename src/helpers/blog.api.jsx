import axios from 'axios'

export const getBlogs = async() => {
  const { data } = await axios.get('http://localhost:5000/blog/getAll')
  return data.blogs
}

export const getListCountries = async() => {
  const { data } = await axios.get('https://countriesnow.space/api/v0.1/countries')
  return data.data
}

export const addBlog = async(token, newBlog) => {
  const { data } = await axios.post('http://localhost:5000/blog', newBlog, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )

  return data
}
