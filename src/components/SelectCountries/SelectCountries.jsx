import React, { useEffect, useState } from 'react'
import { getListCountries } from '../../helpers/blog.api'

export const SelectCountries = ({ form, funcForm }) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getListCountries()
      .then(res => setCountries(res))
      .catch(err => console.log(err))
  }, []) 

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    funcForm({ ...form, [name]: value });
  };

  return (
    <div className='mt-2'>
      <select 
        name='country' 
        value={form.country} 
        className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
        onChange={(e) => handleInputs(e)}
      >
        {
          countries && countries.map((category) => (
            <option key={crypto.randomUUID()} value={category.country}>{category.country}</option>
          ))
        }
      </select>
    </div>
  )
}
