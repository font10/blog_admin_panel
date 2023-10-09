import React from "react";
import { Overview } from "../Dashboard/Overview";
import { Images } from "../Dashboard/Images";


export const Home = () => {

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col w-7/12 bg-white p-5 rounded-md">
          <Overview />
        </div>
        <div className="w-5/12 bg-white p-5 font-londrina font-regular rounded-md">
          <Images />
        </div>
      </div>

      <div className="w-full h-96 bg-blue-200 mt-5 rounded-md">

      </div>

    </div>
  );
};
