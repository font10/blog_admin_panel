import { route } from '../models/router.model'
import { AiOutlineComment, HiOutlineDocumentText, MdDashboard, MdPlace } from './icons'
import { icon_EP, icon_L, icon_MP, icon_S } from './images'

export const menuSidebar = [
  { name: 'Home', icon: <MdDashboard size={26} />, route: route.root.path },
  { name: 'Blogs', icon: <HiOutlineDocumentText size={26} />, route: route.blogs.path },
  { name: 'Places', icon: <MdPlace size={26} />, route: route.places.path },
  { name: 'Comments', icon: <AiOutlineComment size={26} />, route: route.comments.path },
]
export const menuUserSidebar = [
  { name: 'My Profile', icon: icon_MP, route: route.root.path },
  { name: 'Edit Profile', icon: icon_EP, route: route.blogs.path },
  { name: 'Settings', icon: icon_S, route: route.places.path },
  { name: 'Logout', icon: icon_L, route: route.places.path },
]