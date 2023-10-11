import axios from 'axios'

export const getInfoImages = async() => {
  const { data } = await axios.get('http://localhost:5000/image')

  if(!data) console.log('Error')

  return data.infoImages
}
