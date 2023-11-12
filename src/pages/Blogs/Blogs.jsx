import React, { useEffect, useState } from 'react'
import { formatDate, } from '../../utils/functions'
import { AiTwotoneDelete, MdEdit, MdOutlineAddCircleOutline } from '../../utils/icons'
import { blogsHead } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { activeModal, changeId, toggleActionCheck } from '../../redux/appSlice'
import { Modal } from '../../components/Modal/Modal'
import { ToastContainer } from 'react-toastify'
import { Zoom, toast } from 'react-toastify'
import { deleteBlog, getBlogs } from '../../services/blog.api'
import { useLocation } from 'react-router-dom'

export const Blogs = () => { 
  const location = useLocation()
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [action, setAction] = useState('Add')
  const { modal, actionCheck } = useSelector((state) => state.app)
  const { token } = useSelector((state) => state.auth)
  
  useEffect(() => {
    getBlogs()
      .then(res => setBlogs(res) )
      .catch(err => console.log(err))
  }, [actionCheck])

  const handlerDeletePlace = (id) => {
    deleteBlog(token, id)
      .then(res => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
          className: 'foo-bar text-lg font-medium font-bahnschrift',
          transition: Zoom,
          autoClose: 1500,
          theme: "colored",
        })
        setTimeout(() => {
          dispatch(toggleActionCheck())
        }, 500);
      })
      .catch(err => toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
        className: 'foo-bar text-lg font-medium font-bahnschrift',
        transition: Zoom,
        autoClose: 1500,
        theme: "colored",
    }))
  }

  return (
    <div className='flex flex-col bg-white shadow-md p-5 mt-5 rounded-md px-5'>
      
      <div className='flex flex-row justify-between items-center'>  
        <span className="font-londrina font-regular ml-5 text-2xl">
          Blogs          
        </span>
        { location.pathname !== '/' && <button className='flex flex-row gap-2 items-center bg-cyan-600 px-4 py-1.5 rounded-md text-white hover:bg-cyan-500 cursor-pointer' onClick={ () => { setAction('AddBlog'); dispatch(activeModal(true)) } } >
          <MdOutlineAddCircleOutline className='text-white' size={20}/>
          <span className='font-londrina text-md text-white'>Add blog</span>
        </button>
        }
      </div>
      
      { modal && 
        <Modal action={action} page='Blog' />
      }
      
      <ToastContainer />
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead className='w-full'>
            <tr className='flex flex-row gap-3 justify-between w-full mt-5'>
              {
                blogsHead.map(item => (
                  <th key={crypto.randomUUID()} className={`font-londrina font-light ${item.width} ${item.align}`}>{item.name}</th>    
                ))
              }
            </tr>
          </thead>
          
          <tbody>
            {
              blogs && blogs.map(blog => (
                <tr key={crypto.randomUUID()} className='flex flex-row gap-3 px-5 justify-between items-center w-full mt-5'>
                  <th className='font-londrina text-sm font-extralight'>
                    <img 
                      src={`http://localhost:5000/images/` + blog.image.split('_').splice(1).join(' ')} 
                      alt='images uploaded'
                      className='rounded-[500px] h-10 w-10' 
                    />
                  </th>
                  <th className='font-londrina text-sm font-extralight w-32'>{blog.title}</th>
                  <th className='font-londrina text-sm font-extralight w-52'>{blog.desc.slice(0,70)}</th>
                  <th className='font-londrina text-sm font-extralight w-20'>{blog.category}</th>
                  <th className='font-londrina text-sm font-extralight w-24 text-center'>{blog.place.country}</th>
                  <th className='font-londrina text-sm font-extralight w-24'>{blog.place.place}</th>
                  <th className='font-londrina text-sm font-extralight w-20'>{blog.userId.username}</th>
                  <th className='font-londrina text-sm font-extralight w-28'>{formatDate(blog.createdAt)}</th>
                  <th className='font-londrina text-sm font-extralight w-28'>{formatDate(blog.updatedAt)}</th>
                  { location.pathname !== '/' && <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight w-20'>
                    <div className='bg-[#c9f3f2] p-1.5 rounded-full cursor-pointer' onClick={ () => { setAction('EditBlog'); dispatch(activeModal(true)); dispatch(changeId(blog._id)) } }><MdEdit className='text-[#3ec7c1]' size={20} /></div>
                    <div className='bg-[#ffdede] p-1.5 rounded-full cursor-pointer'><AiTwotoneDelete className='text-[#ff7f87]' size={20} onClick={() => handlerDeletePlace(blog._id)} /></div>
                  </th> 
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

/*
{
              blogs && blogs.map(place => (
                <tr key={crypto.randomUUID()} className='flex flex-row gap-3 px-5 justify-between items-center w-full mt-5'>
                  <th className='font-londrina text-sm font-extralight'>
                    <img 
                      src={`http://localhost:5000/images/` + place.image.split('_').splice(1).join(' ')} 
                      alt='images uploaded'
                      className='rounded-[500px] h-10 w-10' 
                    />
                  </th>
                  <th className='font-londrina text-sm font-extralight w-32'>{place.place}</th>
                  <th className='font-londrina text-sm font-extralight w-20 text-center'>{place.country}</th>
                  <th className='font-londrina text-sm font-extralight w-28'>{formatDate(place.createdAt)}</th>
                  <th className='font-londrina text-sm font-extralight w-28'>{formatDate(place.updatedAt)}</th>
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight w-20'>
                    <div className='bg-[#c9f3f2] p-1.5 rounded-full cursor-pointer' onClick={ () => { setAction('Edit'); dispatch(activeModal(true)); dispatch(changeId(place._id)) } }><MdEdit className='text-[#3ec7c1]' size={20} /></div>
                    <div className='bg-[#ffdede] p-1.5 rounded-full cursor-pointer'><AiTwotoneDelete className='text-[#ff7f87]' size={20} /></div>
                  </th>
                </tr>
              ))
            }
*/