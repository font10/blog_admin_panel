import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";

export const ImagePicker = ({ inputs, setInputs }) => {
  const [preview, setPreview] = useState(undefined);
  const [imageModified, setImageModified] = useState(false);
  const hiddenFileInput = useRef(null)
  
  useEffect(() => {
    if(inputs) {
      if (!inputs.image) {
        setPreview(undefined);
        return;
      }

      let objectUrl = null
      if(inputs.image) {
        objectUrl = URL.createObjectURL(new Blob([inputs.image]), {
          type: "application/zip",
        });
        setPreview(objectUrl);
      }

    }
  }, [inputs]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const onChangeFile = (e) => {
    setImageModified(true);
    setInputs({ ...inputs, image: e.target.files[0] });
  };

  const handleCloseImg = () => {
    setInputs({ ...inputs, image: null });
  };

  return (
    <div className="w-full h-92">
      {
        preview && inputs.image 
      ?   <div>        
            <AiOutlineCloseCircle onClick={() => handleCloseImg()} size={20} className="absolute right-5 top-16 z-20 text-white hover:text-slate-400 hover:rounded-full cursor-pointer" />
            <img src={ imageModified ? preview : `http://localhost:5000/images/` + inputs.image.split('_').splice(1).join(' ') } height={250} className="w-full max-h-72 rounded-sm object-cover" alt="" onClick={handleClick} />
            
            <input id="dropzone-file" type="file" className="absolute hidden right-0 w-full h-[290px] z-6" ref={hiddenFileInput} onChange={onChangeFile} />
          </div>
        : <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={onChangeFile} />
            </label>
          </div>           
      }
    </div>
  )
}
