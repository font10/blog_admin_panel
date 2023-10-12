import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineLeft, AiOutlineRight } from '../../../../utils/icons'
import { categories } from '../../../../utils/constants'
import { useSelector } from 'react-redux'
import { uploadImage } from '../../../../helpers/files.api'
import { addBlog } from '../../../../helpers/blog.api'
import { SelectCountries } from '../../../../components/SelectCountries/SelectCountries'
import { getListPlaces } from '../../../../helpers/places.api'

export const CreateForm = () => {
  const INITIAL_VALUES = {
    title: '',
    desc: '',
    image: '',
    category: 'Mountain',
    country: 'Afghanistan',
    place: ''
  }
  const { token } = useSelector((state) => state.auth)
  const [places, setPlaces] = useState([])
  const [inputs, setInputs] = useState(INITIAL_VALUES)

  useEffect(() => {
    getListPlaces()
      .then(res => { setPlaces(res); setInputs({ ...inputs, place: res[0]._id }) })
      .catch(err => console.log(err))
  }, [])

  console.log(inputs)

  const handleCloseImg = () => {
    setInputs({ ...inputs, image: null })
  }

  const onChangeFile = (e) => {
    console.log(typeof inputs.image)
    console.log(typeof e.target.files[0])
    setInputs({ ...inputs, image: e.target.files[0] })
  }

  const handleInputs = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handlePlace = (place) => {
    setInputs({ ...inputs, place: place._id })
  }

  const sliderLeft = () => {
    var slider = document.querySelector('#slider')
    console.log(slider)
    slider.scrollLeft = slider.scrollLeft - 200
  }

  const sliderRight = () => {
    var slider = document.querySelector('#slider')
    console.log(slider)
    slider.scrollLeft = slider.scrollLeft + 200
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

      const newBlog = {
        title: inputs.title,
        desc: inputs.desc,
        image: filename,
        category: inputs.category,
        country: inputs.country,
        place: inputs.place
       }
       console.log(newBlog)

      addBlog(token, newBlog)
        .then(res => { setInputs(INITIAL_VALUES); console.log(res) }) //navigate(`/blogDetails/${res.blog._id}`) )
        .catch(err => console.log(err))
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-10/12 lg:w-6/12 p-5' encType='multipart/form-data'>
      <div className=''>
        <input 
          type="text" 
          name='title'
          className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
          placeholder="Title"
          onChange={(e) => handleInputs(e)}
        />
      </div>
      <div className=''>
        <textarea 
          type="text" 
          name='desc'
          className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
          placeholder="Description"
          onChange={(e) => handleInputs(e)}
        />
      </div>
      <div className='w-full mt-3'>
        <select 
          name='category' 
          value={inputs.category} 
          className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
          onChange={(e) => handleInputs(e)}
        >
          {
            categories.map((category) => (
              <option key={crypto.randomUUID()} value={category}>{category}</option>
            ))
          }
        </select>
      </div>
      <div className='w-full mt-3'>
        <SelectCountries
          value={inputs.country}
          customHandle={handleInputs}
        />
      </div>
      <div className='w-full mt-3'>
        <div id='slider' className='flex flex-row overflow-auto overflow-hidden my-8 gap-3'>
          <div className='absolute h-10 w-10 p-3 bg-stone-300 rounded-full flex flex-col left-[25%] top-[36rem] z-10' onClick={sliderLeft}><AiOutlineLeft /></div>
          {
            places.map(place => (
              <div key={crypto.randomUUID()} 
                className={`${inputs.place === place._id.toString() ? 'bg-purple-500 p-1 rounded-xl' : 'bg-none mt-4 transition duration-700 ease-in-out hover:mt-0 hover:rounded-xl' } relative min-w-[150px] min-h-[250px] group overflow-hidden transition-shadow cursor-pointer`} 
                onClick={() => handlePlace(place)}
              >
                <img src={`http://localhost:5000/images/` + place.image.split('_').splice(1).join(' ')}  alt='' className='h-full object-cover transition-transform duration-500 mb-2 group-hover:rotate-3 group-hover:scale-125 rounded-xl' />
                <div className='absolute flex flex-col text-white w-full bottom-10 items-center'>
                  <span className='font-londrina text-xl text-center'>{place.place}</span>
                </div>
              </div>  
            ))
          }
          <div className='absolute h-10 w-10 p-3 bg-stone-300 rounded-full flex flex-col right-[25%] top-[36rem] z-10' onClick={sliderRight}><AiOutlineRight /></div>
        </div>
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
