import React from "react";
import { Blogs, ImagesDash, Overview, Places } from "../index";


export const Home = () => {

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col w-full bg-white shadow-md p-5 rounded-md">
          <Overview />
        </div>
      </div>

      <div className="w-full h-[530px] shadow-md rounded-md">
        <Blogs />
      </div>

      <div className="flex flex-col xl:flex-row gap-3 mt-5">
        <div className="flex flex-col w-full xl:w-7/12 bg-white shadow-md p-5 rounded-md">
          <Places />
        </div>
        <div className="w-full xl:w-5/12 bg-white p-5 shadow-md font-londrina font-regular rounded-md">
          <ImagesDash />
        </div>
      </div>

    </div>
  );
};
