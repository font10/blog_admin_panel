import React, { useEffect, useState } from 'react'
import { getListCountries } from '../../services/blog.api'

export const SelectCountries = ({ form, funcForm }) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getListCountries()
      .then(res => { setCountries(res); funcForm({...form, country: res[0].country }) } )
      .catch(err => console.log(err))
  }, []) 

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    funcForm({ ...form, [name]: value });
  };
  
  return (
    <div className='mt-1'>
      <select 
        name='country' 
        value={form.country} 
        required
        className='w-full px-5 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none'
        onChange={(e) => handleInputs(e)}
      >
        {
          countries && countries.map((item) => (
            <option key={crypto.randomUUID()} value={item.country}>{item.country}</option>
          ))
        }
      </select>
    </div>
  )
}
