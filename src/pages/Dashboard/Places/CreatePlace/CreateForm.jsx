import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from '../../../../utils/icons'
import { useSelector } from 'react-redux'
import { uploadImage } from '../../../../helpers/files.api'
import axios from 'axios'
import { addPlace, getCountries } from '../../../../helpers/places.api'

export const CreateForm = () => {
  const INITIAL_VALUES = {
    country: '',
    place: '',
    image: '',
  }
  const [countries, setCountries] = useState([])
  const [inputs, setInputs] = useState(INITIAL_VALUES)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    getCountries()
      .then(res => setCountries(res))
      .catch(err => console.log(err))
  }, [])


  const handleCloseImg = () => {
    setInputs({ ...inputs, image: null })
  }

  const onChangeFile = (e) => {
    setInputs({ ...inputs, image: e.target.files[0] })
  }

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      
      let filename = null
      if(inputs.image) {
        filename = crypto.randomUUID() + '_' + inputs.image.name
        formData.append("filename", filename)
        formData.append("image", inputs.image)

        uploadImage(formData)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else {
        return
      }

      const newPlace = {
        country: inputs.country,
        place: inputs.place,
        image: filename,
       }
       

      addPlace(token, newPlace)
        .then(res => setInputs(INITIAL_VALUES)) /*navigate(`/blogDetails/${res.blog._id}`)*/ 
        .catch(err => console.log(err))
    } catch(err) {
      console.log(err)
    }
  }


  return (
    <form onSubmit={handleSubmit} className='w-10/12 lg:w-6/12 p-5' encType='multipart/form-data'>
      <div className=''>        
        <div className='w-full mt-3'>
          <select 
            name='country' 
            value={inputs.country} 
            className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
            onChange={(e) => handleInputs(e)}
          >
            {
              countries.map((category) => (
                <option key={crypto.randomUUID()} value={category.country}>{category.country}</option>
              ))
            }
          </select>
        </div>
        <input 
          type="text" 
          name='place'
          className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
          placeholder="Place"
          onChange={(e) => handleInputs(e)}
        />
      </div>
      <div className='mt-3'>
        <input type="file" name='image' className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-100 file:text-violet-700
          hover:file:bg-violet-200"
          onChange={onChangeFile}
        />
        {
          inputs.image && <p className=''>{inputs.image.name} <AiOutlineCloseCircle onClick={() => handleCloseImg()} /></p>
        }
      </div>
      <button className='bg-violet-500 hover:bg-violet-400 w-full text-white font-medium px-6 py-2 rounded-lg mt-8'>Submit</button>
    </form>
  )
}
