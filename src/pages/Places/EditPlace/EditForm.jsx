import React, { useEffect, useRef, useState } from 'react'
import { ImagePicker, SelectPlace } from '../../../components/index'
import { uploadImage } from '../../../services/files.api'
import { editPlace, getPlaceById } from '../../../services/places.api'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, toggleActionCheck } from '../../../redux/appSlice'
import { Zoom, toast } from 'react-toastify'
import { getListCountries } from '../../../services/blog.api'
import 'react-toastify/dist/ReactToastify.css';

export const EditForm = () => {
  const { token } = useSelector((state) => state.auth)
  const { id } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [countries, setCountries] = useState([])
  const countriesFetchedRef = useRef(false)
  const [inputs, setInputs] = useState({
    country: '',
    place: '',
    image: undefined,
  })

  useEffect(() => {    
    if (countriesFetchedRef.current) return;
    countriesFetchedRef.current = true;
    getListCountries()
      .then(res => { setCountries(res) } )
      .catch(err => console.log(err))
  }, []) 
  
  useEffect(() => {
    getPlaceById(id)
      .then(res => setInputs({
        country: res.country,
        place: res.place,
        image: res.image
      }))
      .catch(err => console.log(err))
  }, [id])

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()  
    if(inputs.image) {
      formData.append("image", inputs.image)

      const url = await uploadImage(token, formData)

      let updPlace = {}
      if(typeof inputs.image === 'object') {
        updPlace = {
          country: inputs.country,
          place: inputs.place,
          image: url
        }
      } else {
        updPlace = {
          country: inputs.country,
          place: inputs.place,
          image: inputs.image
        }
      }

      await editPlace(token, id, updPlace)
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
    }
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
              <select 
                name='country' 
                value={inputs.country} 
                required
                className='w-full px-5 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none'
                onChange={(e) => handleInputs(e)}
              >
                {
                  countries && countries.map((item) => (
                    <option key={crypto.randomUUID()} value={item.country}>{item.country}</option>
                  ))
                }
              </select>
            </div>
            <div className='mt-5'>
              <label className='font-londrina text-lg text-black font-light'>Place</label>
              <SelectPlace
                form={inputs}
                funcForm={setInputs}
                page='Place'
              />
            </div>
          </div>
        }
        <button className='w-full rounded-md px-4 py-1.5 mt-5 font-londrina font-light text-lg bg-cyan-600 hover:bg-cyan-500'>Update</button>
    </form>
  </div>
  )
}
