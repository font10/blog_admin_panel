import axios from 'axios'

export const getInfoImages = async() => {
  const { data } = await axios.get('http://localhost:5000/image')

  if(!data) console.log('Error')

  return data.infoImages
}

export const uploadImage = async(formData) => {
  const { data } = await axios.post('http://localhost:5000/images/single', formData)

  return data 
}
