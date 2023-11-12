import axios from 'axios'

export const getPlaces = async() => {
  const { data } = await axios.get('http://localhost:5000/place')
  return data
}

export const getPlaceById = async(id) => {
  const { data } = await axios.get('http://localhost:5000/place/' + id)
  return data.place
}

export const addPlace = async(token, newPlace) => {
  const { data } = await axios.post('http://localhost:5000/place', newPlace, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}

export const editPlace = async(token, id, editPlace) => {
  const { data } = await axios.put(('http://localhost:5000/place/' + id), editPlace, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}

export const deletePlace = async(token, id) => {
  const { data } = await axios.delete(('http://localhost:5000/place/' + id), { headers: {
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
  const { data } =  await axios.get('http://localhost:5000/place')
  return data
}

