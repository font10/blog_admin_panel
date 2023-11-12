import React from "react";
import { icon_B, icon_P } from "../../../utils/images";
import { AreaChartComp } from "../../../components";
import { useSelector } from "react-redux";

export const Overview = () => {
  const { blogsLength, placesLength } = useSelector(state => state.app)
  const overviewInfo = [
    { title: "Blogs", img: icon_B, quantity: blogsLength },
    { title: "Places", img: icon_P, quantity: placesLength },
  ];

  return (
    <div className="h-full lg:h-[35vh]">
      <span className="font-londrina font-regular ml-5 text-2xl">Overview</span>
      <div className="flex flex-col xl:flex-row justify-center w-full mt-8 gap-3 h-full lg:h-72 overflow-x-auto pb-8">
        <div className={`h-44 w-full flex-col xl:w-1/12`}>
          {overviewInfo.map((info) => (
            <div key={crypto.randomUUID()} className="flex flex-row lg:flex-col items-center w-full gap-3 p-5 py-3">
              <img src={info.img} width={60} alt="" />
              <div className="flex flex-row items-center gap-2">
                <span className="font-londrina font-light text-[24px]">
                  {info.quantity}
                </span>
                <span className="font-londrina font-light text-[15px]">
                  {info.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grafic w-full xl:w-9/12 overflow-x-auto">
          <AreaChartComp />
        </div>
      </div>
    </div>
  );
};