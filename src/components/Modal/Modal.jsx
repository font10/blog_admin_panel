import React from 'react'
import { AiOutlineCloseCircle } from '../../utils/icons'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/appSlice'
import { CreateForm } from '../../pages/Places/CreatePlace/CreateForm'
import { EditForm } from '../../pages/Places/EditPlace/EditForm'
import { CreateFormBlog } from '../../pages/Blogs/CreateBlog/CreateFormBlog'
import { EditFormBlog } from '../../pages/Blogs/EditBlog/EditFormBlog'

export const Modal = ({ action, page }) => {  
  const dispatch = useDispatch()

  const actionBody = () => {
    switch(action) {
      case 'AddPlace': return <CreateForm />
      case 'EditPlace': return <EditForm />
      case 'AddBlog': return <CreateFormBlog />
      case 'EditBlog': return <EditFormBlog />
      default: return <CreateForm />        
    }
  }
  
  
  return (
    <div className={`flex flex-col w-[500px] ${ page === 'Blog' ? 'top-[1%] h-[930px]' : 'top-[15%] h-[650px]' } left-[38%] fixed bg-white shadow-xl rounded-md transition duration-500 ease-in-out p-5`}>
      <div className="absolute right-6 top-6 z-20 bg-stone-400 bg-opacity-30 hover:bg-neutral-400 hover:bg-opacity-30 rounded-full bg-opacity-50 p-1.5 cursor-pointer">    
        <AiOutlineCloseCircle onClick={() => dispatch(closeModal(false))} size={20} className=" text-white" />
      </div>
      <div className="relative top-0 text-white flex flex-row justify-between items-center gap-2 z-10 p-3">
        {
          actionBody()
        }          
      </div>
    </div>
  )
}
