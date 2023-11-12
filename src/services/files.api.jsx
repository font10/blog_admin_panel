import axios from 'axios'

export const getInfoImages = async() => {
  const { data } = await axios.get('http://localhost:5000/image')

  if(!data) console.log('Error')

  return data.infoImages
}

export const uploadImage = async(token, formData) => {
  console.log(token)
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
  const { data } = await axios.post('http://localhost:5000/files/uploadImages', formData, { headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }})
  return data.images.url 
}
