import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { BsChevronDoubleRight } from "../../utils/icons";
import { ImagePicker } from '../../components/ImagePicker/ImagePicker'
import { getPlaceById, getPlaces } from "../../helpers/places.api";
import { SelectCountries } from "../../components/SelectCountries/SelectCountries";

export const Sidebar = () => {
  const { activeSidebarCrud, idEdit, setActiveSidebarCrud } = useStateContext();
  const [places, setPlaces] = useState()
  const [inputs, setInputs] = useState({
    country: "",
    place: "",
    image: undefined,
  });

  const handleSubmit = (e) => {};

  useEffect(() => {
    getPlaceById(idEdit)
      .then(res => setInputs(res))
      .catch(err => console.log(err))
  },[idEdit])

  useEffect(() => {
    getPlaces()
      .then(res => setPlaces(res))
      .catch(err => console.log(err))
  },[])

  const handleInputs = (evt) => {
    console.log(evt)
    const { name, value } = evt.target;
    setInputs({ ...inputs, [name]: value });
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
          <ImagePicker
            inputs={inputs}
            setInputs={setInputs}
          />
        </div>
        <form encType="multipart/form-data" className="w-full" onSubmit={handleSubmit}>          
          <div className=" mt-10 p-5">
            <label className="font-londrina font-regular ml-1">Country</label>
            <SelectCountries 
              form={inputs}
              funcForm={setInputs}
            />
          </div>
          <div className="px-5">
            <label className="font-londrina font-regular ml-1">Places</label>
            <div>
              <select 
                name='place' 
                value={inputs.place} 
                className='w-full px-5 py-3 border-2 border-gray-200 rounded-md focus:outline-none'
                onChange={(e) => handleInputs(e)}
              >
                {
                  places && places.map((category) => (
                    <option key={crypto.randomUUID()} value={category._id}>{category.place}</option>
                  ))
                }
              </select>
            </div>
            <button className="mt-3 w-full py-2 rounded-md bg-purple-500 text-white mx-auto flex justify-center">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};