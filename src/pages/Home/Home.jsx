import React from "react";
import { Blogs, Overview, Places } from "../index";

export const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col w-full bg-white shadow-md p-5 rounded-md">
          <Overview />
        </div>
      </div>

      <div className="w-full rounded-md">
        <Blogs />
      </div>

      <div className="flex flex-col xl:flex-row gap-3 mt-5">
        <div className="flex flex-col w-full bg-white shadow-md p-5 rounded-md">
          <Places />
        </div>
      </div>

    </div>
  );
};
