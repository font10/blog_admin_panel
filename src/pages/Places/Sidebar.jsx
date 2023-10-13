import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { BsChevronDoubleRight } from "../../utils/icons";
import { ImagePicker } from '../../components/ImagePicker/ImagePicker'
import { getPlaceById } from "../../helpers/places.api";
import { SelectCountries } from "../../components/SelectCountries/SelectCountries";

export const Sidebar = () => {
  const { activeSidebarCrud, idEdit, setActiveSidebarCrud } = useStateContext();
  const [inputs, setInputs] = useState({
    country: "",
    place: "",
    image: "",
  });

  const handleSubmit = (e) => {};

  useEffect(() => {
    getPlaceById(idEdit)
      .then(res => setInputs(res))
      .catch(err => console.log(err))
  },[])

  const handleInputs = (evt) => {
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
            setInputs={handleInputs}
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
        </form>
      </div>
    </div>
  );
};