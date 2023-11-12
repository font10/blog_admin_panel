import React from 'react'
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";
import { data } from "../../utils/constants";

export const AreaChartComp = () => {
  return (
    <div>
      <AreaChart
        width={800}
        height={240}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
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
  )
}
