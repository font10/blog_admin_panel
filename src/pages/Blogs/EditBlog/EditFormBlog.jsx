import React, { useEffect, useRef, useState } from 'react'
import { ImagePicker, Loading, SelectCountries } from '../../../components/index'
import { uploadImage } from '../../../services/files.api'
import { getPlaces } from '../../../services/places.api'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, toggleActionCheck } from '../../../redux/appSlice'
import { Zoom, toast } from 'react-toastify'
import { categories } from '../../../utils/constants'
import { editBlog, getBlogById } from '../../../services/blog.api'
import 'react-toastify/dist/ReactToastify.css';

export const EditFormBlog = () => {
  const dataFetchedRef = useRef(false)
  const { token } = useSelector((state) => state.auth)
  const { id } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [places, setPlaces] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [inputs, setInputs] = useState({
    country: 'Afghanistan',
    category: '',
    desc: '',
    image: undefined,
    place: '',
    title: '',
  })

  useEffect(() => {
    getPlaces()
      .then(res => { setPlaces(res);  } )
      .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getBlogById(id)
      .then(res =>  { setInputs({
        country: res.place.country,
        category: res.category,
        desc: res.desc,
        image: res.image,
        place: res.place._id,
        title: res.title
      }) ;console.log(res) })
      .catch(err => console.log(err))
  }, [id])

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('Uploading image, updating blog')
    let updPlace = {}

    if(typeof inputs.image === 'object') {
      const formData = new FormData()      
      formData.append("image", inputs.image)
      const url = await uploadImage(token, formData)

      updPlace = {
        country: inputs.country,
        category: inputs.category,
        desc: inputs.desc,
        image: url,
        place: inputs.place,
        title: inputs.title
      }
      console.log('Change image')
    } else {
      updPlace = {
        country: inputs.country,
        category: inputs.category,
        desc: inputs.desc,
        image: inputs.image,
        place: inputs.place,
        title: inputs.title
      }
    }

    await editBlog(token, id, updPlace)
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
    
    setIsLoading(false)
    setMessage('')    
  }
  
  return (
    <div className='h-full w-full'>
      <span className='text-black font-londrina text-2xl'>Edit Blog</span>
      { isLoading && (
        <div className='absolute flex flex-col items-center top-[40%] h-64 left-[10%] rounded-md bg-white shadow-md'>
          <Loading />
          <p className='font-roboto text-black font-medium text-lg'>{message}</p>
        </div>
      )}
      <form encType="multipart/form-data" className="w-full" onSubmit={handleSubmit}>
        { inputs && 
          <div>
            <div className='w-full mt-3'>
              <ImagePicker
                inputs={inputs}
                setInputs={setInputs}
              />
            </div>
            <div className='mt-3'>
              <label className='font-londrina text-lg text-black font-light'>Title</label>
              <input 
                type="text" 
                name='title'
                value={inputs.title}
                required
                className="w-full mt-1 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm text-black px-6"
                placeholder="Title"
                onChange={(e) => handleInputs(e)}
              />
            </div>
            <div className='mt-3'>
              <label className='font-londrina text-lg text-black font-light'>Description</label>
              <textarea 
                type="text" 
                name='desc'
                value={inputs.desc}
                required
                className="w-full mt-1 py-3 px-4 block w-full resize-none focus:outline-none border-2 border-gray-200 rounded-md text-sm text-black px-6"
                placeholder="Description"
                onChange={(e) => handleInputs(e)}
              />
            </div>
            <div className='w-full mt-3'>
              <label className='font-londrina text-lg text-black font-light'>Category</label>
              <select 
                  name='category' 
                  value={inputs.category} 
                  required
                  className='w-full px-5 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none'
                  onChange={(e) => handleInputs(e)}
                >
                  {
                    categories.map((item) => (
                      <option key={crypto.randomUUID()} value={item}>{item}</option>
                    ))
                  }
                </select>
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
              <select 
                name='place' 
                value={inputs.place} 
                required
                className='w-full px-5 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none'
                onChange={(e) => handleInputs(e)}
              >
                {
                  places && places.map((item) => (
                    <option key={crypto.randomUUID()} value={ item._id }>{item.place}</option>
                  ))
                }
              </select>
            </div>
          </div>
        }
        <button className='w-full rounded-md px-4 py-1.5 mt-5 font-londrina font-light text-lg bg-cyan-600 hover:bg-cyan-500'>Update</button>
    </form>
  </div>
  )
}
