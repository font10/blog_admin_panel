import React from "react";
import { profile } from "../../utils/images";
import { menuUserSidebar } from "../../utils/constants";
import { MdArrowDropDown, MdArrowDropUp } from "../../utils/icons";
import { Link } from "react-router-dom";
import { Collapse } from "react-collapse";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/authSlice'

export const UserMenu = ({ activeMenu, isDropUser, setIsDropUser }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex flex-row justify-between items-center mt-4 text-white p-2 transition duration-500 ease-in-out">
        <div className="flex flex-row items-center gap-3">
          <img src={profile} alt="pic user" width={40} />
          <span
            className={`${
              activeMenu ? "block" : "hidden"
            } font-londrina font-light`}
          >
            {user?.username ||'User'}
          </span>
        </div>
        {isDropUser ? (
          <MdArrowDropUp
            size={20}
            className={`${activeMenu ? "block " : "hidden"} cursor-pointer`}
            onClick={() => setIsDropUser(!isDropUser)}
          />
        ) : (
          <MdArrowDropDown
            size={20}
            className={`${activeMenu ? "block" : "hidden"} cursor-pointer`}
            onClick={() => setIsDropUser(!isDropUser)}
          />
        )}
      </div>

      <Collapse isOpened={isDropUser}>
        <div>
          {menuUserSidebar.map((menu) => (
            <Link
              key={crypto.randomUUID()}
              to={menu.route}
              className={`flex flex-row items-center gap-6 text-white my-1.5 hover:bg-gray-700 ml-2 hover:bg-opacity-50 hover:rounded-sm p-1.5`}
            >
              <img src={menu.icon} alt="icon user action" width={30} />
              <span
                className={`${activeMenu ? "block" : "hidden"} font-londrina text-md font-extralight`}
              >
                {menu.name}
              </span>
            </Link>
          ))}
        </div>
      </Collapse>
      
    </div>
  );
};
