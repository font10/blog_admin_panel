import React from 'react'
import { profile } from '../../../utils/images'
import { FiLogOut } from '../../../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/authSlice'

export const MyProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  return (
    <div className='flex flex-row justify-center w-full mx-auto p-5'>
      <div className='flex flex-col justify-center items-center w-6/12 bg-white py-10 mx-auto rounded-md'>
        <div>
          <img src={profile} alt='pic profile' width={120} />
          <div className='flex flex-col items-center justify-center mt-6'>
            <span className='font-londrina text-2xl font-light'>{ user.username }</span>
            <span className='font-londrina text-md font-light'>{ user.email }</span>
            <button className='flex flex-row items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md mt-8 text-red-50' onClick={() => { dispatch(logout()) }}>
              <FiLogOut size={20} className='text-red-50' /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
