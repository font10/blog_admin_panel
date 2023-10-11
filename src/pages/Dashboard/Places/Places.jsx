import React, { useEffect, useState } from 'react'
import { getPlaces } from '../../../helpers/places.api'
import { formatDate, } from '../../../utils/functions'

export const PlacesDash = () => {
  const [places, setPlaces] = useState()

  useEffect(() => {
    getPlaces()
      .then(res => setPlaces(res) )
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='flex flex-col'>
      <span className="font-londrina font-regular ml-5 text-2xl">
        Places
      </span>
      
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead className='w-full'>
            <tr className='flex flex-row gap-3 justify-between w-full mt-5 px-5'>
              <th className='font-londrina font-light'>Image</th>
              <th className='font-londrina font-light text-left'>Place</th>
              <th className='font-londrina font-light text-center'>Country</th>
              <th className='font-londrina font-light'>Created At</th>
              <th className='font-londrina font-light'>Updated At</th>
            </tr>
          </thead>
          
          <tbody>
            {
              places && places.slice(0, 5).map(place => (
                <tr key={crypto.randomUUID()} className='flex flex-row gap-3 px-5 justify-between items-center w-full mt-5'>
                  <th className='font-londrina text-sm font-extralight'>
                    <img 
                      src={`http://localhost:5000/images/` + place.image.split('_').splice(1).join(' ')} 
                      alt='images uploaded'
                      className='rounded-[500px] h-10 w-10' 
                    />
                  </th>
                  <th className='font-londrina text-sm font-extralight w-32'>{place.place}</th>
                  <th className='font-londrina text-sm font-extralight w-20 text-center'>{place.country}</th>
                  <th className='font-londrina text-sm font-extralight w-28'>{formatDate(place.createdAt)}</th>
                  <th className='font-londrina text-sm font-extralight w-28'>{formatDate(place.updatedAt)}</th>
                  
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
