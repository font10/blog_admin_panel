import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { editUser } from '../../../services/user.api'
import { Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const EditProfileForm = () => {
  const { user, token } = useSelector((state) => state.auth)
  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
  })

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    editUser(token, user._id, inputs)
      .then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
          className: 'foo-bar text-lg font-medium font-bahnschrift',
          transition: Zoom,
          autoClose: 1500,
          theme: "colored",
        })
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
    <section className='w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <span className='text-black font-londrina text-2xl'>Edit User</span>
        <div className='mt-5'>
          <label className='font-londrina text-lg text-black font-light'>Username</label>
          <input 
            type="text" 
            name='username'
            value={inputs.username}
            required
            className="w-full mt-1 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm text-black px-6"
            placeholder="Username"
            onChange={(e) => handleInputs(e)}
          />
        </div>
        <div className='mt-5'>
          <label className='font-londrina text-lg text-black font-light'>Email</label>
          <input 
            type="text" 
            name='email'
            value={inputs.email}
            disabled
            className="w-full mt-1 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 bg-gray-100 text-gray-400 rounded-md text-sm text-black px-6"
            placeholder="Email"
            onChange={(e) => handleInputs(e)}
          />
        </div>
        <button className='w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-md mt-5'>Save</button>
      </form>
    </section>
  )
}
