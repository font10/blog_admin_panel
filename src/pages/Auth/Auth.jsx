import React from 'react'
import { AuthForm } from './AuthForm'
import { aurora } from '../../utils/images'

export const Auth = () => {
  
  return (
    <div>
    <div className='bg-mountain min-h-screen flex items-center  justify-center px-16'>
      <div className='relative flex flex-row w-6/12 shadow-3xl'>
        <div className='w-2/5'>
          <img src={aurora} alt='' className='h-full' />
        </div>
        <div className='p-5 w-3/5 bg-white rounded-lg'>
          <AuthForm />
        </div>
      </div>
    </div>
  </div>
  )
}
