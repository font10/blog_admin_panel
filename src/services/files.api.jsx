import axios from 'axios'

export const getInfoImages = async() => {
  const { data } = await axios.get('http://localhost:5000/image')

  if(!data) console.log('Error')

  return data.infoImages
}

export const uploadImage = async(token, formData) => {
  const { data } = await axios.post('http://localhost:5000/files/uploadImages', formData, { headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }})
  return data.images.url 
}
