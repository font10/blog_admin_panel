import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Navbar } from '../Navbar/Navbar'

export const Layout = ({children}) => {
  return (
    <div className={'flex flex-row min-h-screen'}>      
      <Sidebar />
      
      <div className='flex flex-col w-full ml-64 overflow-y-auto h-screen'>
        <Navbar />
        <div className="flex-1 p-5 bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}
