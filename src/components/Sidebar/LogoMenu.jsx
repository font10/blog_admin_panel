import React from 'react'
import { diafragma } from "../../utils/images";
import { BsChevronDoubleLeft } from "../../utils/icons";

export const LogoMenu = ({ activeMenu, setActiveMenu }) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3 ml-2">
          <img
            src={diafragma}
            alt="icon site"
            width={40}
            onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          />
          <span
            className={`${
              activeMenu ? "block" : "hidden"
            } text-white font-londrina text-2xl`}
          >
            Colourvid Panel
          </span>
        </div>
        <BsChevronDoubleLeft
          className={`${activeMenu ? "block" : "hidden"} text-white`}
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        />
      </div>
      <hr className="mt-5 border-1 border-gray-700 mx-1 cursor-pointer" />
    </div>
  )
}
