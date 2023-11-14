import { route } from '../models/router.model'
import { HiOutlineDocumentText, MdDashboard, MdPlace } from './icons'
import { cascada, castillo, icon_MP, montana, sombrilla, via_lactea } from './images'

export const menuSidebar = [
  { name: 'Home', icon: <MdDashboard size={26} />, route: route.root.path },
  { name: 'Blogs', icon: <HiOutlineDocumentText size={26} />, route: route.blogs.path },
  { name: 'Places', icon: <MdPlace size={26} />, route: route.places.path },
]
export const menuUserSidebar = [
  { name: 'My Profile', icon: icon_MP, route: route.user.myprofile.path },
]

export const categories = [
  'Mountain',
  'Waterfall',
  'Coast',
  'Milky way',
  'Architecture',
]

export const categoriesSearch = [
  { name: 'Architecture', icon: castillo },
  { name: 'Coast', icon: sombrilla },
  { name: 'Milky way', icon: via_lactea },
  { name: 'Mountain', icon: montana },
  { name: 'Waterfall', icon: cascada },
]


export const blogsHead = [ 
  { name: 'Image', width: 'w-14', align: 'text-right'},
  { name: 'Title', width: 'w-32', align: ''},
  { name: 'Description', width: 'w-52', align: 'text-center'},
  { name: 'Category', width: 'w-20', align: 'text-left'},
  { name: 'Country', width: 'w-24', align: 'text-center'},
  { name: 'Place', width: 'w-24', align: 'text-center'},
  { name: 'User', width: 'w-20', align: 'text-center'},
  { name: 'Created At', width: 'w-28', align: 'text-center'},
  { name: 'Updated At', width: 'w-28', align: 'text-center'  },
  { name: 'Actions', width: 'w-20', align: 'text-left'  }
]

export const placesHead = [
  { name: 'Image', width: 'w-14', align: 'text-right' },
  { name: 'Place', width: 'w-40', align: 'text-center' },
  { name: 'Country', width: 'w-24', align: 'text-left' },
  { name: 'Created At', width: 'w-32', align: 'text-left' },
  { name: 'Updated At', width: 'w-28', align: 'text-left' },
  { name: 'Actions', width: 'w-20', align: 'text-left' },
]

export const data = [
  {
    "name": "Jan",
    "blogs": 4000,
    "comments": 2400,
    "places": 3500,
    "images": 5100,
    "amt": 2400
  },
  {
    "name": "Feb",
    "blogs": 3000,
    "comments": 1398,
    "places": 5400,
    "images": 4800,
    "amt": 2210
  },
  {
    "name": "Mar",
    "blogs": 2000,
    "comments": 9800,
    "places": 4000,
    "images": 2800,
    "amt": 2290
  },
  {
    "name": "Apr",
    "blogs": 2780,
    "comments": 3908,
    "places": 2100,
    "images": 3900,
    "amt": 2000
  },
  {
    "name": "May",
    "blogs": 1890,
    "comments": 4800,
    "places": 3200,
    "images": 3300,
    "amt": 2181
  },
  {
    "name": "June",
    "blogs": 2390,
    "comments": 3800,
    "places": 2600,
    "images": 1800,
    "amt": 2500
  },
  {
    "name": "July",
    "blogs": 3490,
    "comments": 4300,
    "places": 1600,
    "images": 900,
    "amt": 2100
  },
  {
    "name": "Aug",
    "blogs": 2200,
    "comments": 1230,
    "places": 3450,
    "images": 1860,
    "amt": 2000
  },
  {
    "name": "Sept",
    "blogs": 2110,
    "comments": 1120,
    "places": 1540,
    "images": 3760,
    "amt": 0
  },
  {
    "name": "Oct",
    "blogs": 2000,
    "comments": 3890,
    "places": 4220,
    "images": 1000,
    "amt": 0
  },
  {
    "name": "Nov",
    "blogs": 4500,
    "comments": 1230,
    "places": 790,
    "images": 2300,
    "amt": 0
  },
  {
    "name": "Dec",
    "blogs": 2890,
    "comments": 2300,
    "places": 1500,
    "images": 3400,
    "amt": 0
  },
]