import React, { useState } from 'react'
import { diafragma, profile } from '../../utils/images'
import { menuSidebar, menuUserSidebar } from '../../utils/constants'
import { BsChevronDoubleLeft, MdArrowDropDown, MdArrowDropUp } from '../../utils/icons'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'

export const Sidebar = () => {
  const [isDropUser, setIsDropUser] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')
  const {activeMenu, setActiveMenu} = useStateContext();

  return (
    <div className={`flex flex-col h-full left-0 top-0 fixed bg-gray-900 ${ activeMenu ? 'w-72' : 'w-24' } transition duration-500 ease-in-out p-5`}>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row items-center gap-3 ml-2'>
          <img src={diafragma} alt='icon site' width={40} onClick={() => setActiveMenu( prevActiveMenu => !prevActiveMenu )} />
          <span className={`${ activeMenu ? 'block' : 'hidden' } text-white font-londrina text-2xl`}>Colourvid Panel</span>
        </div>
        <BsChevronDoubleLeft className={`${ activeMenu ? 'block' : 'hidden' } text-white`} onClick={() => setActiveMenu( prevActiveMenu => !prevActiveMenu )} />
      </div>
      <hr className='mt-5 border-1 border-gray-700 mx-1 cursor-pointer duration-500' />

      <div className='flex flex-row justify-between items-center mt-4 text-white p-2'>
        <div className='flex flex-row items-center gap-3'>
          <img src={profile} alt='pic user' width={40} />
          <span className={`${ activeMenu ? 'block' : 'hidden' } font-londrina font-light`}>David Font</span>
        </div>
        { isDropUser 
            ? <MdArrowDropUp size={20} className={`${ activeMenu ? 'block' : 'hidden' } cursor-pointer`} onClick={() => setIsDropUser(!isDropUser)} /> 
            : <MdArrowDropDown size={20} className={`${ activeMenu ? 'block' : 'hidden' } cursor-pointer`} onClick={() => setIsDropUser(!isDropUser)} /> 
        }
      </div>

      <div className={`${ isDropUser ? 'block transition-all duration-700 ease-in-out' : 'hidden' }`}>
        {
          menuUserSidebar.map(menu => (
            <Link key={crypto.randomUUID()} to={menu.route} className={`flex flex-row items-center gap-6 text-white my-1.5 hover:bg-gray-700 ml-2 hover:bg-opacity-50 hover:rounded-sm p-1.5`}>
              <img src={menu.icon} alt='icon user action' width={30} />
              <span className={`${ activeMenu ? 'block' : 'hidden' } ${ menu.name === 'Logout' ? 'text-red-600' : 'text-white'} font-londrina text-md font-extralight`}>{menu.name}</span>
            </Link>
          ))
        }
      </div>
      <hr className='mt-5 border-1 border-gray-700 mx-1 cursor-pointer duration-500' />
      
      <div className='mt-5'>
        {
          menuSidebar.map(menu => (
            <Link key={crypto.randomUUID()} to={menu.route} className={`flex flex-row items-center gap-6 text-white my-2 hover:bg-gray-700 hover:bg-opacity-50 hover:rounded-sm p-3 ${ activeTab === menu.name ? 'bg-cyan-600 rounded-sm' : 'bg-transparent '}`}>
              <span className='text-white'>{menu.icon}</span>
              <span className={`${ activeMenu ? 'block' : 'hidden' } font-londrina text-lg font-light`}>{menu.name}</span>
            </Link>
          ))
        }
      </div>

    </div>
  )
}
