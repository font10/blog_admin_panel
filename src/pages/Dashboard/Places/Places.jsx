import React, { useEffect, useState } from 'react'
import { getPlaces } from '../../../helpers/places.api'
import { formatDate, } from '../../../utils/functions'
import { useStateContext } from '../../../context/ContextProvider'
import { AiTwotoneDelete, MdEdit, MdOutlineAddCircleOutline } from '../../../utils/icons'
import { placesHead } from '../../../utils/constants'
import { SidebarPlaces } from '../../../components/SidebarPlaces/SidebarPlaces'
import { SidebarCrud } from '../../../components/SidebarCrud/SidebarCrud'

export const PlacesDash = () => {
  const [places, setPlaces] = useState()
  const [blogToEdit, setBlogToEdit] = useState()
  const [isAdding] = useState(true)
  const { activeSidebarCrud, setActiveSidebarCrud } = useStateContext()

  useEffect(() => {
    getPlaces()
      .then(res => setPlaces(res) )
      .catch(err => console.log(err))
  }, [])

  const handler = (id, isAdding) => {
    console.log(id, isAdding)
    if(!isAdding) setBlogToEdit(id)
    else setBlogToEdit(undefined)
    setActiveSidebarCrud(!activeSidebarCrud)
  }
  
  return (
    <div className='flex flex-col bg-white shadow-md p-5 rounded-md px-5'>
      <div className='flex flex-row justify-between items-center'>  
        <span className="font-londrina font-regular ml-5 text-2xl">
          Places          
        </span>
        <button className='flex flex-row gap-2 items-center bg-cyan-600 px-4 py-1.5 rounded-md text-white hover:bg-cyan-500 cursor-pointer' onClick={() => handler(undefined, true) }>
          <MdOutlineAddCircleOutline className='text-white' size={20}/> 
          <span className='font-londrina text-md text-white'>Add place</span>
        </button>
      </div>
      { activeSidebarCrud && <SidebarCrud isAdding={isAdding} /> }
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead className='w-full'>
            <tr className='flex flex-row gap-3 justify-between w-full mt-5'>
              {
                placesHead.map(item => (
                  <th key={crypto.randomUUID()} className={`font-londrina font-light ${item.width} ${item.align}`}>{item.name}</th>    
                ))
              }
            </tr>
          </thead>
          
          <tbody>
            {
              places && places.map(place => (
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
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight w-20'>
                    <div className='bg-[#c9f3f2] p-1.5 rounded-full cursor-pointer' onClick={() => handler(place._id, false)}><MdEdit className='text-[#3ec7c1]' size={20} /></div>
                    <div className='bg-[#ffdede] p-1.5 rounded-full cursor-pointer'><AiTwotoneDelete className='text-[#ff7f87]' size={20} /></div>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
