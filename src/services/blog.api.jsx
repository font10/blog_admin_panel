import axios from 'axios'

export const getBlogs = async() => {
  const { data } = await axios.get('https://blog-backend-j50n.onrender.com/blog/getAll')
  return data.blogs
}

export const getBlogById = async(id) => {
  const { data } = await axios.get('https://blog-backend-j50n.onrender.com/blog/' + id)
  console.log(data)
  return data.blog
}


export const getListCountries = async() => {
  const { data } = await axios.get('https://countriesnow.space/api/v0.1/countries')
  return data.data
}

export const addBlog = async(token, newBlog) => {
  const { data } = await axios.post('https://blog-backend-j50n.onrender.com/blog', newBlog, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )

  return data
}

export const editBlog = async(token, id, editBlog) => {
  const { data } = await axios.put(('https://blog-backend-j50n.onrender.com/blog/' + id), editBlog, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}

export const deleteBlog = async(token, id) => {
  const { data } = await axios.delete(('https://blog-backend-j50n.onrender.com/blog/' + id), { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}
