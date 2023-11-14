import axios from 'axios'

export const getPlaces = async() => {
  const { data } = await axios.get('https://blog-backend-j50n.onrender.com/place')
  return data
}

export const getPlaceById = async(id) => {
  const { data } = await axios.get('https://blog-backend-j50n.onrender.com/place/' + id)
  return data.place
}

export const addPlace = async(token, newPlace) => {
  const { data } = await axios.post('https://blog-backend-j50n.onrender.com/place', newPlace, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}

export const editPlace = async(token, id, editPlace) => {
  const { data } = await axios.put(('https://blog-backend-j50n.onrender.com/place/' + id), editPlace, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}

export const deletePlace = async(token, id) => {
  const { data } = await axios.delete(('https://blog-backend-j50n.onrender.com/place/' + id), { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}

export const getCountries = async() => {
  const { data } = await axios.get('https://countriesnow.space/api/v0.1/countries')
  return data.data
}

export const getListPlaces = async() => {
  const { data } =  await axios.get('https://blog-backend-j50n.onrender.com/place')
  return data
}

