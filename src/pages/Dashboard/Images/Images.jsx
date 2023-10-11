import React, { useEffect, useState } from 'react'
import { getInfoImages } from '../../../helpers/files.api'
import { imagesHead } from '../../../utils/constants'

export const ImagesDash = () => {
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
      
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead className='w-full'>
            <tr className='flex flex-row gap-3 justify-between w-full mt-5 px-5'>
              {
                imagesHead.map(item => (
                  <th key={crypto.randomUUID()} className={`font-londrina font-light ${item.width} ${item.align}`}>{item.name}</th>    
                ))
              }
            </tr>
          </thead>
          

          <tbody>
            {
              images && images.slice(0, 5).map(img => (
                <tr key={crypto.randomUUID()} className='flex flex-row gap-3 px-5 justify-between items-center w-full mt-5'>
                  <th className='font-londrina text-sm font-extralight'>
                  <img 
                    src={`http://localhost:5000/images/` + img.name} 
                    alt='images uploaded'
                    className='rounded-[500px] h-10 w-10' 
                  />
                  </th>
                  <th className='font-londrina text-sm font-extralight text-center w-40'>{img.name}</th>
                  <th className='font-londrina text-sm font-extralight text-center w-16'>{img.size}</th>
                  <th className='font-londrina text-sm font-extralight text-center w-10'>{`${img.weight} MB`}</th>
                  
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

/*
 <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight w-14'>
    <div className='bg-[#33d9b2] p-1.5 rounded-full text-white'><MdEdit size={18} color='white' /></div>
    <div className='bg-[#ff626d] p-1.5 rounded-full text-white'><AiTwotoneDelete size={18} color='white' /></div>
  </th>
*/