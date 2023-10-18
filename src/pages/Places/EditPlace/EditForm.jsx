import React, { useEffect, useState } from 'react'
import { SelectCountries } from '../../../components/SelectCountries/SelectCountries'
import { SelectPlace } from '../../../components/SelectPlace/SelectPlace'
import { ImagePicker } from '../../../components/ImagePicker/ImagePicker'
import { uploadImage } from '../../../helpers/files.api'
import { editPlace, getPlaceById } from '../../../helpers/places.api'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../redux/appSlice'
import { Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const EditForm = () => {
  const { token } = useSelector((state) => state.auth)
  const { id } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    country: '',
    place: '',
    image: undefined,
  })

  useEffect(() => {
    getPlaceById(id)
      .then(res => setInputs({
        country: res.country,
        place: res.place,
        image: res.image
      }))
      .catch(err => console.log(err))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()  
    let filename = null

    console.log(inputs)

    if(typeof inputs.image === 'object') {
      console.log('Change image')
    } else console.log('No changed image')

    if(inputs.image && typeof inputs.image === 'object') {
      filename = crypto.randomUUID() + '_' + inputs.image.name
      formData.append("filename", filename)
      formData.append("image", inputs.image)

      await uploadImage(formData)
        .then(res => console.log(res))
        .catch(err => console.log(err)) 
    }

    let updPlace = {}
    if(typeof inputs.image === 'object') {
      updPlace = {
        country: inputs.country,
        place: inputs.place,
        image: filename
      }
    } else {
      updPlace = {
        country: inputs.country,
        place: inputs.place,
        image: inputs.image
      }
    }

    console.log(updPlace)
    editPlace(token, id, updPlace)
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
    <div className='h-full w-full'>
      <span className='text-black font-londrina text-2xl'>Edit Place</span>
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
              <SelectPlace
                form={inputs}
                funcForm={setInputs}
              />
            </div>
          </div>
        }
        <button className='w-full rounded-md px-4 py-1.5 mt-5 font-londrina font-light text-lg bg-cyan-600 hover:bg-cyan-500'>Update</button>
    </form>
  </div>
  )
}
