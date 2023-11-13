import React, { useState } from "react";
import { diafragma } from "../../utils/images";
import { menuSidebar } from "../../utils/constants";
import { BsChevronDoubleLeft } from "../../utils/icons";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { UserMenu } from "../index";

export const Sidebar = () => {
  const [isDropUser, setIsDropUser] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
      <div
        className={`flex flex-col h-full left-0 top-0 fixed bg-bgSidebar shadow-xl
        ${ activeMenu ? "w-72" : "w-24" } transition duration-500 ease-in-out p-5`}
      >
        <div className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-70 text-white" />
        <div className="flex flex-row justify-between items-center z-10">
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
        <hr className="mt-5 border-1 border-white mx-1 cursor-pointer" />

        <UserMenu
          activeMenu={activeMenu}
          isDropUser={isDropUser}
          setIsDropUser={setIsDropUser}
        />
        <hr className="mt-5 border-1 border-white mx-1 cursor-pointer text-white" />

        <div className="mt-5 z-10">
          {menuSidebar.map((menu) => (
            <Link
              key={crypto.randomUUID()}
              to={menu.route}
              className={`flex flex-row items-center gap-6 text-white my-2 hover:bg-gray-700 hover:bg-opacity-50 hover:rounded-sm p-3 
              ${ activeTab === menu.name
                  ? "bg-cyan-600 rounded-sm"
                  : "bg-transparent "
              }`}
              onClick={() => setActiveTab(menu.name)}
            >
              <span className="text-white">{menu.icon}</span>
              <span
                className={`${
                  activeMenu ? "block" : "hidden"
                } font-londrina text-lg font-light`}
              >
                {menu.name}
              </span>
            </Link>
          ))}
        </div>
        
      </div>
  );
};
