import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../../helpers/blog.api'
import { profile } from '../../../utils/images'
import { formatDate, getIconCategory } from '../../../utils/functions'
import { blogsHead } from '../../../utils/constants'
import { AiTwotoneDelete, MdEdit } from '../../../utils/icons'
import { SidebarCrud } from '../../../components/SidebarCrud/SidebarCrud'
import { useStateContext } from '../../../context/ContextProvider'

export const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const [blogToEdit, setBlogToEdit] = useState()
  const { activeSidebarCrud, setActiveSidebarCrud } = useStateContext()

  useEffect(() => {
    getBlogs()
      .then(res => setBlogs(res))
      .catch(err => console.log(err))
  }, [])

  const handler = (blog) => {
    setBlogToEdit(blog)
    setActiveSidebarCrud(!activeSidebarCrud)
  }

  return (
    <div className='bg-white shadow-md p-5 rounded-md px-5'>
      <div className='flex flex-row justify-between items-center'>
        <span className="font-londrina font-regular text-2xl">Blogs</span>
        <input type='text' placeholder='Search...' className='w-4/12 border-2 border-gray-200 rounded-md py-1.5 ps-5 font-londrina font-light focus:outline-none ' />
      </div>
      { activeSidebarCrud && <SidebarCrud blog={blogToEdit} /> }
      <section className="flex flex-row w-full mt-3 gap-3 overflow-x-auto">
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
          
          <tbody className='overflow-x-auto lg:overflow-x-none'>
            {
              blogs && blogs.map(blog => (
                <tr key={crypto.randomUUID()} className='flex flex-row gap-3 justify-between items-center w-full mt-5'>
                  <th className='font-londrina text-sm font-extralight text-center'>
                    <img 
                      src={`http://localhost:5000/images/` + blog.image.split('_').splice(1).join(' ')}
                      alt='category pic'
                      className='rounded-[500px] h-10 w-10' 
                    />  
                  </th>
                  <th className='font-londrina text-sm font-extralight text-center w-32'>{blog.title}</th>
                  <th className='font-londrina text-sm font-extralight text-center w-48'>{blog.desc.slice(0,70)}</th>
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight text-center w-20'>
                    <img src={getIconCategory(blog)} 
                      alt='pic of place' 
                      className='rounded-[500px] h-10 w-10' 
                    />
                    {blog.category}
                  </th>
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight text-end w-10'>
                    {blog.place.country}
                  </th>
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight text-center w-32'>
                    <img src={`http://localhost:5000/images/` + blog.place.image.split('_').splice(1).join(' ')} 
                      alt='pic of place' 
                      className='rounded-[500px] h-10 w-10' 
                    />
                    {blog.place.place}
                  </th>
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight text-center w-20'>
                    <img src={profile} 
                      alt='pic of place' 
                      className='rounded-[500px] h-10 w-10' 
                    />
                    {blog.userId.username}
                  </th>
                  <th className='font-londrina text-sm font-extralight text-center w-20'>{formatDate(blog.createdAt)}</th>
                  <th className='font-londrina text-sm font-extralight text-center w-20'>{formatDate(blog.updatedAt)}</th>
                  <th className='flex flex-row items-center gap-2 font-londrina text-sm font-extralight w-20'>
                    <div className='bg-[#c9f3f2] p-1.5 rounded-full' onClick={() => handler(blog)}><MdEdit className='text-[#3ec7c1]' size={20} /></div>
                    <div className='bg-[#ffdede] p-1.5 rounded-full'><AiTwotoneDelete className='text-[#ff7f87]' size={20} /></div>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}
