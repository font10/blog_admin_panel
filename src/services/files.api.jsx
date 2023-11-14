import axios from 'axios'

export const getInfoImages = async() => {
  const { data } = await axios.get('https://blog-backend-j50n.onrender.com/image')

  if(!data) console.log('Error')

  return data.infoImages
}

export const uploadImage = async(token, formData) => {
  const { data } = await axios.post('https://blog-backend-j50n.onrender.com/files/uploadImages', formData, { headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }})
  return data.images.url 
}
