import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { BsChevronDoubleRight } from "../../utils/icons";
import { categories } from "../../utils/constants";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { getCountries, getListPlaces, getPlaceById } from "../../helpers/places.api";
import { noImage } from "../../utils/images";
import { uploadImage } from "../../helpers/files.api";

export const SidebarPlaces = ({ id, isAdding }) => {
  const { activeSidebarCrud, setActiveSidebarCrud } = useStateContext();
  const [places, setPlaces] = useState([]);
  const [countries, setCountries] = useState()
  const [preview, setPreview] = useState(undefined);
  const [imageModified, setImageModified] = useState(false);
  const [inputs, setInputs] = useState();
  const hiddenFileInput = useRef(null)

  useEffect(() => {
    if (id !== undefined) {
      getPlaceById(id)
        .then((res) =>
          setInputs({
            country: res.country,
            place: res.place,
            image: res.image,
          })
        )
        .catch((err) => console.log(err));
    } else {
      setInputs({
        country: "",
        place: "",
        image: "",
      });
    }
  }, [isAdding, id]);

  useEffect(() => {
    getListPlaces()
      .then((res) => {
        setPlaces(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCountries()
      .then(res => setCountries(res))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(inputs) {
      if (!inputs.image) {
        setPreview(undefined);
        return;
      }

      let objectUrl = null
      if(inputs.image)
      objectUrl = URL.createObjectURL(new Blob([inputs.image]), {
        type: "application/zip",
      });
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [inputs]);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const formData = new FormData();
      let filename = null;

      if (typeof inputs.image === "object") {
        filename = crypto.randomUUID() + "_" + inputs.image.name;
        formData.append("filename", filename);
        formData.append("image", inputs.image);

        uploadImage(formData)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeFile = (e) => {
    setImageModified(true);
    setInputs({ ...inputs, image: e.target.files[0] });
  };

  const handleCloseImg = () => {
    setInputs({ ...inputs, image: null });
  };

  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handlePlace = (place) => {
    setInputs({ ...inputs, place: place._id });
  };

  const sliderLeft = () => {
    var slider = document.querySelector("#slider");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const sliderRight = () => {
    var slider = document.querySelector("#slider");
    slider.scrollLeft = slider.scrollLeft + 200;
  };

  return (
    <div className={`flex flex-col h-full w-[500px] h-full right-0 top-0 fixed bg-gray-200 shadow-xl transition duration-500 ease-in-out`}>
      <div className="relative top-0 text-white flex flex-row justify-between items-center gap-2 z-10 p-3">
        <BsChevronDoubleRight
          className="text-blue-400 absolute left-3 top-3 cursor-pointer"
          size={20}
          onClick={() => setActiveSidebarCrud(!activeSidebarCrud)}
        />
        
      </div>

      <div className="absolute top-0 w-full overflow-y-auto">
        <div className="w-full h-92">
          {
            preview && inputs.image 
            ? <div for="dropzone-file"> 
            
        <AiOutlineCloseCircle onClick={() => handleCloseImg()} size={20} className="absolute right-3 top-3 z-20 text-white cursor-pointer" />
                <img src={ imageModified ? preview : `http://localhost:5000/images/` + inputs.image.split('_').splice(1).join(' ') } height={250} className="w-full max-h-72 object-cover" alt="" onClick={handleClick} />
                
                <input id="dropzone-file" type="file" class="absolute hidden right-0 w-full h-[290px] z-6" ref={hiddenFileInput} onChange={onChangeFile} />
              </div>
            : <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" onChange={onChangeFile} />
                </label>
              </div>           
          }
        </div>
        <div className="p-5 pt-2">
          <form
            onSubmit={handleSubmit}
            className="w-full p-3"
            encType="multipart/form-data"
          >
            { inputs && (
              <div>
                <div className="mt-10">
                  <select 
                    name='country' 
                    value={inputs.country} 
                    className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
                    onChange={(e) => handleInputs(e)}
                  >
                    {
                      countries && countries.map((category) => (
                        <option key={crypto.randomUUID()} value={category.country}>{category.country}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mt-5">
                  <span className="font-londrina text-lg ml-1">Places</span>
                  <div id='slider' className='flex flex-row overflow-auto overflow-hidden mt-2 mb-8 gap-3'>
                    <div className='absolute h-10 w-10 p-3 bg-stone-300 rounded-full flex flex-col left-[3%] top-[31.5rem] z-10' onClick={sliderLeft}><AiOutlineLeft /></div>
                      {
                        places.map(place => (
                          <div key={crypto.randomUUID()} 
                            className={`${inputs.place === place.place.toString() ? 'bg-purple-500 p-1 rounded-xl' : 'bg-none mt-4 transition duration-700 ease-in-out hover:mt-0 hover:transition hover:duration-700 hover:ease-in-out hover:rounded-xl' } relative min-w-[130px] min-h-[180px] group overflow-hidden transition-shadow cursor-pointer`} 
                            onClick={() => handlePlace(place)}
                          >
                            <img src={`http://localhost:5000/images/` + place.image.split('_').splice(1).join(' ')}  alt='' className='h-full object-cover transition-transform duration-500 mb-2 group-hover:rotate-3 group-hover:scale-125 rounded-xl' />
                            <div className='absolute flex flex-col text-white w-full bottom-10 items-center'>
                              <span className='font-londrina text-xl text-center'>{place.place}</span>
                            </div>
                          </div>  
                        ))
                      }
                    <div className='absolute h-10 w-10 p-3 bg-stone-300 rounded-full flex flex-col right-[3%] top-[31.5rem] z-10' onClick={sliderRight}><AiOutlineRight /></div>
                  </div>
                </div>
                <button className='bg-violet-500 hover:bg-violet-400 w-full text-white font-medium px-6 py-2 rounded-lg mt-8'>{ id ? 'Update' : 'Create' }</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};