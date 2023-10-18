import React from 'react'
import { AiOutlineCloseCircle } from '../../utils/icons'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/appSlice'
import { CreateForm } from '../../pages/Places/CreatePlace/CreateForm'
import { EditForm } from '../../pages/Places/EditPlace/EditForm'

export const Modal = ({ action }) => {  
  const dispatch = useDispatch()
  
  return (
    <div className={`flex flex-col h-[650px] w-[500px] left-[38%] top-[15%] fixed bg-white shadow-xl rounded-md transition duration-500 ease-in-out p-5`}>
        <div className="absolute right-6 top-6 z-20 bg-stone-400 bg-opacity-30 hover:bg-neutral-400 hover:bg-opacity-30 rounded-full bg-opacity-50 p-1.5 cursor-pointer">    
          <AiOutlineCloseCircle onClick={() => dispatch(closeModal(false))} size={20} className=" text-white" />
        </div>
        <div className="relative top-0 text-white flex flex-row justify-between items-center gap-2 z-10 p-3">
          {
            action === 'Add'
            ? <CreateForm i /> 
            : <EditForm />          
          }          
        </div>
      </div>
  )
}
