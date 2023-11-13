import React from 'react'
import { Navbar, Sidebar } from '../index'
import { useStateContext } from '../../context/ContextProvider'

export const Layout = ({children}) => {
  const { activeMenu } = useStateContext();

  return (
    <div className={'flex flex-row min-h-screen'}>      
      <Sidebar />
      
      <div className={` flex flex-col w-full ${ activeMenu ? 'w-72' : 'w-24' } overflow-y-auto h-screen`}>
        <Navbar />
        <div className={` ${ activeMenu ? 'ml-72' : 'ml-24' } flex-1 p-5 bg-[#ededed]`}>
          { children }
        </div>
      </div>
    </div>
  )
}
