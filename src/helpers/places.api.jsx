import axios from 'axios'

export const getPlaces = async() => {
  const { data } = await axios.get('http://localhost:5000/place')
  return data
}

export const getListPlaces = async() => {
  const { data } =  await axios.get('http://localhost:5000/place')
  return data
}