import React, { useState } from 'react'
import { ImagePicker, SelectCountries } from '../../../components/index'
import { uploadImage } from '../../../services/files.api'
import { addPlace } from '../../../services/places.api'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, toggleActionCheck } from '../../../redux/appSlice'
import { Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const CreateForm = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    country: '',
    place: '',
    image: undefined,
  })

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    if(inputs.image) {
      formData.append("image", inputs.image)

      const url = await uploadImage(token, formData)

      const newPlace = {
        country: inputs.country,
        place: inputs.place,
        image: url
      }

      addPlace(token, newPlace)
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
            setInputs({
              country: '',
              place: '',
              image: undefined,
            })
            dispatch(closeModal(false))
          }, 500);
        }) 
        .catch(err => toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          className: 'foo-bar text-lg font-medium font-bahnschrift',
          transition: Zoom,
          autoClose: 1500,
          theme: "colored",
      }))
    } else return

  }
  
  return (
    <div className='h-full w-full'>
      <span className='text-black font-londrina text-2xl'>Create Place</span>
      <form encType="multipart/form-data" className="w-full" onSubmit={handleSubmit}>
        { inputs && 
          <div>
            <div className='w-full mt-3'>
              <ImagePicker
                inputs={inputs}
                setInputs={setInputs}
              />
            </div>
            <div className='w-full mt-3'>
              <label className='font-londrina text-lg text-black font-light'>Country</label>
              <SelectCountries
                form={inputs}
                funcForm={setInputs}
              />
            </div>
            <div className='mt-5'>
              <label className='font-londrina text-lg text-black font-light'>Place</label>
              <input 
                type="text" 
                name='place'
                required
                className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm text-black px-6"
                placeholder="Place"
                onChange={(e) => handleInputs(e)}
              />
            </div>
          </div>
        }
        <button className='w-full rounded-md px-4 py-1.5 mt-5 font-londrina font-light text-lg bg-cyan-600 hover:bg-cyan-500'>Create</button>
    </form>
  </div>
  )
}
