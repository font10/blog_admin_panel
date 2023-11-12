import React from 'react'
import { useStateContext } from '../../context/ContextProvider';

export const Navbar = () => {
  const { activeMenu } = useStateContext();

  return (
    <div className={`flex flex-row ${ activeMenu ? 'left-72' : 'left-24'} justify-between items-center  py-5 px-5 bg-gray-50 shadow-sm w-full`}>
      <div className={`font-londrina ${ activeMenu ? 'ml-72': 'ml-24' } text-xl`}>
        Colourvid
      </div>
    </div>
  )
}
