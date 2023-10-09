import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";
import { data } from "../../utils/constants";
import { icon_B, icon_C, icon_I, icon_P } from "../../utils/images";

export const Overview = () => {
  const overviewInfo = [
    { title: "Blogs", img: icon_B, quantity: 30 },
    { title: "Comments", img: icon_C, quantity: 102 },
    { title: "Places", img: icon_P, quantity: 22 },
    { title: "Images", img: icon_I, quantity: 55 },
  ];

  return (
    <div>
      <span className="font-londrina font-regular ml-5 text-2xl">Overview</span>
      <div className="flex flex-row justify-center w-full mt-8 gap-3">
        <div className="flex flex-col w-3/12">
          {overviewInfo.map((info) => (
            <div className="cardsInfo flex flex-row items-center w-full gap-3 p-5 py-3">
              <img src={info.img} width={60} alt="" />
              <div className="flex flex-col">
                <span className="font-londrina font-light text-[15px]">
                  {info.title}
                </span>
                <span className="font-londrina font-light text-[24px]">
                  {info.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grafic w-9/12">
          <AreaChart
            width={630}
            height={330}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3ec7c1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3ec7c1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff626d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff626d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPlaces" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffa900" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffa900" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorImages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#009bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#009bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="blogs"
              stroke="#3ec7c1"
              fillOpacity={1}
              fill="url(#colorBlogs)"
            />
            <Area
              type="monotone"
              dataKey="comments"
              stroke="#ff626d"
              fillOpacity={1}
              fill="url(#colorComments)"
            />
            <Area
              type="monotone"
              dataKey="places"
              stroke="#ffa900"
              fillOpacity={1}
              fill="url(#colorPlaces)"
            />
            <Area
              type="monotone"
              dataKey="images"
              stroke="#009bff"
              fillOpacity={1}
              fill="url(#colorImages)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};
