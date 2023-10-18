import React, { useEffect, useState } from 'react'
import { getPlaces } from '../../helpers/places.api'

export const SelectPlace= ({ form, funcForm, idEdit }) => {
  const [places, setPlaces] = useState()

  useEffect(() => {
    getPlaces()
      .then(res => { setPlaces(res); funcForm({...form, 'place': res[0].place }) })
      .catch(err => console.log(err))
  },[])

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    funcForm({ ...form, [name]: value });
  };

  return (
    <div>
      { idEdit !== undefined 
        ? <select 
            name='place' 
            value={form.place} 
            className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
            onChange={(e) => handleInputs(e)}
          >
            {
              places && places.map((category) => (
                <option key={crypto.randomUUID()} value={category.place}>{category.place}</option>
              ))
            }
          </select>
        : <div>
          <input 
            type="text" 
            name='place'
            className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
            placeholder="Place"
            onChange={(e) => handleInputs(e)}
          />
        </div>
      }
    </div>
  )
}
