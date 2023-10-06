import React from 'react'
import { useStateContext } from '../../context/ContextProvider';

export const Navbar = () => {
  const { activeMenu } = useStateContext();

  return (
    <div className='flex flex-row justify-between items-center h-16 px-5 bg-gray-400 w-full'>
      <div className={`font-londrina ${ activeMenu ? 'ml-72': 'ml-24' } text-xl`}>
        Colourvid
      </div>
      <div>
        dasd
      </div>
    </div>
  )
}
