import React, { useState } from 'react'
import { SelectCountries } from '../../../components/SelectCountries/SelectCountries'
import { ImagePicker } from '../../../components/ImagePicker/ImagePicker'
import { uploadImage } from '../../../helpers/files.api'
import { addPlace } from '../../../helpers/places.api'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../redux/appSlice'
import { Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const CreateForm = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [message, setMessage] = useState()
  const [inputs, setInputs] = useState({
    country: '',
    place: '',
    image: undefined,
  })

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
    console.log(inputs)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(inputs)

    const formData = new FormData()  
    let filename = null

    if(inputs.image) {
      filename = crypto.randomUUID() + '_' + inputs.image.name
      formData.append("filename", filename)
      formData.append("image", inputs.image)

      await uploadImage(formData)
        .then(res => console.log(res))
        .catch(err => console.log(err)) 
    } else return

    const newPlace = {
      country: inputs.country,
      place: inputs.place,
      image: filename
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
            dispatch(closeModal(false))
        }, 1700);
         setMessage(res.message)
        }) 
        .catch(err => toast.success(err, {
          position: toast.POSITION.TOP_CENTER,
          className: 'foo-bar text-lg font-medium font-bahnschrift',
          transition: Zoom,
          autoClose: 1500,
          theme: "colored",
      }))
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
