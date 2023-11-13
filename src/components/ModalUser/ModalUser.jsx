import React from 'react'
import { AiOutlineCloseCircle } from '../../utils/icons'
import { useDispatch } from 'react-redux'
import { closeModalUser } from '../../redux/appSlice'
import { EditProfileForm } from '../../pages/index'

export const ModalUser = () => {
  const dispatch = useDispatch()

  return (
    <div className={`flex flex-col w-[500px] top-[25%] h-[360px] left-[44%] fixed bg-white shadow-xl rounded-md transition duration-500 ease-in-out p-5`}>
      <div className="absolute right-6 top-6 z-20 bg-stone-400 bg-opacity-30 hover:bg-neutral-400 hover:bg-opacity-30 rounded-full bg-opacity-50 p-1.5 cursor-pointer">    
        <AiOutlineCloseCircle size={20} className=" text-white" onClick={() => dispatch(closeModalUser(false))} />
      </div>
      <div className="relative top-0 text-white flex flex-row w-full justify-between items-center gap-2 z-10 p-3">
        <EditProfileForm />
      </div>
    </div>
  )
}
