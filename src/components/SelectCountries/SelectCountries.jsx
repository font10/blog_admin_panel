import React, { useEffect, useState } from 'react'
import { getListCountries } from '../../helpers/blog.api'

export const SelectCountries = ({ value, customHandle }) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getListCountries()
      .then(res => setCountries(res))
      .catch(err => console.log(err))
  }, [])

  return (
    <select 
      name='country' 
      value={value} 
      className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
      onChange={(e) => customHandle(e)}
    >
      {
        countries.map((countrie) => (
          <option key={crypto.randomUUID()} value={countrie.country}>{countrie.country}</option>
        ))
      }
    </select>
  )
}
