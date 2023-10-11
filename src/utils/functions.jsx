import { categoriesSearch } from "./constants"

export const getIconCategory = (blog) => {
  const cat = categoriesSearch.filter(cat => cat.name === blog.category)
  return cat[0].icon
}

export const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString().split('T')[0];
  const time = new Date(date).toTimeString().split(' ')[0];
  return `${newDate} ${time}`
}

