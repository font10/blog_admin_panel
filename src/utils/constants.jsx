import { route } from '../models/router.model'
import { AiOutlineComment, HiOutlineDocumentText, BsCardImage, MdDashboard, MdPlace } from './icons'
import { icon_EP, icon_L, icon_MP, icon_S } from './images'

export const menuSidebar = [
  { name: 'Home', icon: <MdDashboard size={26} />, route: route.root.path },
  { name: 'Blogs', icon: <HiOutlineDocumentText size={26} />, route: route.blogs.path },
  { name: 'Places', icon: <MdPlace size={26} />, route: route.places.path },
  { name: 'Comments', icon: <AiOutlineComment size={26} />, route: route.comments.path },
  { name: 'Images', icon: <BsCardImage size={26} />, route: route.images.path },
]
export const menuUserSidebar = [
  { name: 'My Profile', icon: icon_MP, route: route.user.myprofile.path },
  { name: 'Edit Profile', icon: icon_EP, route: route.user.editprofile.path },
  { name: 'Settings', icon: icon_S, route: route.places.path },
  { name: 'Logout', icon: icon_L, route: route.places.path },
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
    "blogs": 0,
    "comments": 0,
    "places": 0,
    "images": 0,
    "amt": 0
  },
  {
    "name": "Sept",
    "blogs": 0,
    "comments": 0,
    "places": 0,
    "images": 0,
    "amt": 0
  },
  {
    "name": "Oct",
    "blogs": 0,
    "comments": 0,
    "places": 0,
    "images": 0,
    "amt": 0
  },
  {
    "name": "Nov",
    "blogs": 0,
    "comments": 0,
    "places": 0,
    "images": 0,
    "amt": 0
  },
  {
    "name": "Dec",
    "blogs": 0,
    "comments": 0,
    "places": 0,
    "images": 0,
    "amt": 0
  },
]