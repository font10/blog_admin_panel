import React from 'react'
import { CreateForm } from './CreateForm'

export const CreatePlace = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full mx-auto mt-20'>
      <h2 className='text-3xl mb-6 mt-10 font-londrina'>Create a Place</h2>
      <CreateForm />
    </div>
  )
}
