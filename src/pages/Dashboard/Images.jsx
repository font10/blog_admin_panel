import React, { useEffect, useState } from 'react'
import { getInfoImages } from '../../helpers/files.api'

export const Images = () => {
  const [images, setImages] = useState()

  useEffect(() => {
    getInfoImages()
      .then(res => setImages(res))
      .catch(err => console.log(err))
  }, [])
  

  return (
    <div className='flex flex-col'>
      <span className="font-londrina font-regular ml-5 text-2xl">
        Images
      </span>
      
      <div className='w-full'>
        <table className='w-full'>
          <thead className='w-full'>
            <tr className='flex flex-row gap-3 justify-between w-full mt-5 px-5'>
              <th className='font-londrina font-light'>Image</th>
              <th className='font-londrina font-light'>Name</th>
              <th className='font-londrina font-light'>Size</th>
              <th className='font-londrina font-light'>Weight</th>
              <th className='font-londrina font-light'>Actions</th>
            </tr>
          </thead>
          
          <hr className="mt-2 border-1 border-gray-200 mx-3 cursor-pointer" />

          <tbody>
            <div className='mt-3 px-5'>
              {
                images && images.map(img => (
                  <tr className='flex flex-row gap-3 justify-between items-center w-full mt-5'>
                    <th className='font-londrina text-sm font-extralight'>
                    <img 
                      src={`http://localhost:5000/images/` + img.name} 
                      alt='category pic'
                      className='rounded-[500px] h-10 w-10' 
                    />
                    </th>
                    <th className='font-londrina text-sm font-extralight text-left'>{img.name}</th>
                    <th className='font-londrina text-sm font-extralight flex text-left'>{img.size}</th>
                    <th className='font-londrina text-sm font-extralight'>{`${img.weight} MB`}</th>
                    <th className='font-londrina text-sm font-extralight'>Actions</th>
                  </tr>
                ))
              }
            </div>
          </tbody>
        </table>
      </div>

    </div>
  )
}
