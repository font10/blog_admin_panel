import React, { useState, useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { FiLogOut } from '../../utils/icons'
import { categories } from "../../utils/constants";
import { AiOutlineLeft, AiOutlineRight, AiOutlineCloseCircle } from 'react-icons/ai'
import { getListPlaces } from "../../helpers/places.api";
import { noImage } from "../../utils/images";
import { uploadImage } from "../../helpers/files.api";

export const SidebarCrud = ({ blog }) => {
  const INITIAL_VALUES = {
    title: blog.title,
    desc: blog.desc,
    category: blog.category,
    place: blog.place._id,
    image: blog.image
  }
  const { activeSidebarCrud, setActiveSidebarCrud } = useStateContext() 
  const [places, setPlaces] = useState([])
  const [preview, setPreview] = useState(undefined)
  const [imageModified, setImageModified] = useState(false)
  const [inputs, setInputs] = useState(INITIAL_VALUES)

  useEffect(() => {
    getListPlaces() 
      .then(res => { setPlaces(res); })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (!inputs.image) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(new Blob([inputs.image]), {type: "application/zip"})
    setPreview(objectUrl)

    return () => { URL.revokeObjectURL(objectUrl) }
  }, [inputs.image])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)

    try {
      const formData = new FormData()
      let filename = null
      
      if(typeof inputs.image === 'object') {
        filename = crypto.randomUUID() + '_' + inputs.image.name
        formData.append("filename", filename)
        formData.append("image", inputs.image)

        uploadImage(formData)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else {
        return
      }
    } catch(err) {
      console.log(err)
    }
  }

  const onChangeFile = (e) => {
    setImageModified(true)
    setInputs({ ...inputs, image: e.target.files[0] })
  }

  const handleCloseImg = () => {
    setInputs({ ...inputs, image: null })
  }

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    setInputs({ ...inputs, [name]: value })
  }

  const handlePlace = (place) => {
    setInputs({ ...inputs, place: place._id })
  }

  const sliderLeft = () => {
    var slider = document.querySelector('#slider')
    slider.scrollLeft = slider.scrollLeft - 200
  }

  const sliderRight = () => {
    var slider = document.querySelector('#slider')
    slider.scrollLeft = slider.scrollLeft + 200
  }

  return (
    <div className={`flex flex-col h-full w-[500px] h-full right-0 top-0 fixed bg-gray-200 shadow-xl transition duration-500 ease-in-out`}>
      <div className="absolute right-0 text-white flex flex-row justify-between items-center gap-2 z-10 p-3">
        <FiLogOut size={24} onClick={() => setActiveSidebarCrud(!activeSidebarCrud)} />        
      </div>
      
      <div className="absolute top-0 w-full overflow-y-auto">
      <div className="w-full h-92">
        {
          preview && inputs.image ? <img src={ imageModified ? preview : `http://localhost:5000/images/` + inputs.image.split('_').splice(1).join(' ') } height={250} className="w-full max-h-72 object-cover" alt="" />
          : <img src={noImage} height={250} className="w-full max-h-72 object-cover" alt="" />           
        }
      </div>
        <div className="p-5 pt-2">
          <form onSubmit={handleSubmit} className='w-full p-3' encType='multipart/form-data'>
            <div className=''>
              <input 
                type="text"
                name='title'
                value={inputs.title}
                className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 rounded-md text-sm"
                placeholder="Title"
                onChange={(e) => handleInputs(e)}
              />
            </div>
            <div className=''>
              <textarea 
                type="text" 
                name='desc'
                value={inputs.desc}
                className="w-full mt-3 py-3 px-4 block w-full focus:outline-none border-2 border-gray-200 h-32 grow-0 rounded-md text-sm"
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
              <div id='slider' className='flex flex-row overflow-auto overflow-hidden my-8 gap-3'>
                <div className='absolute h-10 w-10 p-3 bg-stone-300 rounded-full flex flex-col left-[3%] top-[27.5rem] z-10' onClick={sliderLeft}><AiOutlineLeft /></div>
                {
                  places.map(place => (
                    <div key={crypto.randomUUID()} 
                      className={`${inputs.place === place._id.toString() ? 'bg-purple-500 p-1 rounded-xl' : 'bg-none mt-4 transition duration-700 ease-in-out hover:mt-0 hover:rounded-xl' } relative min-w-[130px] min-h-[180px] group overflow-hidden transition-shadow cursor-pointer`} 
                      onClick={() => handlePlace(place)}
                    >
                      <img src={`http://localhost:5000/images/` + place.image.split('_').splice(1).join(' ')}  alt='' className='h-full object-cover transition-transform duration-500 mb-2 group-hover:rotate-3 group-hover:scale-125 rounded-xl' />
                      <div className='absolute flex flex-col text-white w-full bottom-10 items-center'>
                        <span className='font-londrina text-xl text-center'>{place.place}</span>
                      </div>
                    </div>  
                  ))
                }
                <div className='absolute h-10 w-10 p-3 bg-stone-300 rounded-full flex flex-col right-[3%] top-[27.5rem] z-10' onClick={sliderRight}><AiOutlineRight /></div>
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
                  inputs.image && <span className=''>{ typeof inputs.image === 'string' ? inputs.image : inputs.image.name} <AiOutlineCloseCircle onClick={() => handleCloseImg()} /></span>
                }
              </div>
              <button className='bg-violet-500 hover:bg-violet-400 w-full text-white font-medium px-6 py-2 rounded-lg mt-8'>Submit</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};
