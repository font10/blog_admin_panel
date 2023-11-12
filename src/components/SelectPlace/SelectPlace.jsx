import React, { useEffect, useState } from 'react'
import { getPlaces } from '../../services/places.api'

export const SelectPlace = ({ form, funcForm, page }) => {
  const [places, setPlaces] = useState()
  
  useEffect(() => {
    getPlaces()
      .then(res => {
        setPlaces(res);
        console.log(res)
        if(page !== 'Place') funcForm({ ...form, place: res[0].place })
      })
      .catch(err => console.log(err))
  },[])

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    console.log(value)
    funcForm({ ...form, [name]: value });
  };

  return (
    <div>
      <select 
        name='place' 
        value={form.place} 
        required
        className='w-full px-5 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none'
        onChange={(e) => handleInputs(e)}
      >
        {
          places && places.map((item) => (
            <option key={crypto.randomUUID()} value={ page === 'Place' ? item.place : item._id }>{item.place}</option>
          ))
        }
      </select>
    </div>
  )
}
