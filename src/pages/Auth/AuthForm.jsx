import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from '../../utils/icons'
import { userAuthRequest } from '../../services/user.api'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { route } from '../../models/router.model'

export const AuthForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const INITIAL_VALUES = {
    username: '',
    email: '',
    password: ''
  }
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPswd, setShowPswd] = useState(false)
  const [inputs, setInputs] = useState(INITIAL_VALUES)

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(inputs)
    userAuthRequest(inputs, isSignUp)
      .then(res => {
        if(isSignUp) { dispatch(login(res)); navigate( route.root.path ) }
        else { setIsSignUp(true) }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-yellow-500'>{ isSignUp ? 'Login' : 'Register' }</h1>
      <form onSubmit={handleSubmit} className='w-full mt-10'>
        {
          !isSignUp && <input 
            type="text" 
            name='username'
            className="w-full py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
            placeholder="Username"
            onChange={(e) => handleInputs(e)}
          />
        }
        <input 
          type="email" 
          name='email'
          className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
          placeholder="Email"
          onChange={(e) => handleInputs(e)}
        />
        <div className='flex items-center border-2 border-gray-200 rounded-md mt-3'>
          <input 
            type={`${ showPswd ? 'text' : 'password'}`} 
            name='password'
            className="w-full py-3 px-4 block w-full focus:outline-none text-sm"
            placeholder="Password"
            onChange={(e) => handleInputs(e)}
          />
          {
            showPswd
              ? <AiOutlineEyeInvisible className='mr-3 text-stone-700 cursor-pointer' size={20} onClick={() => { setShowPswd(!showPswd)} }/>
              : <AiOutlineEye className='mr-3 text-stone-700 cursor-pointer' size={20} onClick={() => setShowPswd(!showPswd)}/> 
          }
        </div>
        <button className='mt-8 w-full bg-purple-400 py-2 text-white font-semibold hover:bg-purple-500 rounded-lg'>{ isSignUp ? 'Login' : 'Register' }</button>
        <p className='text-sm mt-6 flex flex-wrap justify-center text-gray-500 font-medium'>Do you not have an account? Create! 
          <span 
            className='text-yellow-500 hover:text-yellow-400 font-semibold ml-2 cursor-pointer'
            onClick={() => setIsSignUp(!isSignUp)} 
          >
            { isSignUp ? 'Register' : 'Login' }
          </span>
        </p>
        </form>
    </div>
  )
}
