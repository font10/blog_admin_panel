import { useState } from 'react'

export const useIsOpenSidebar = () => {
    
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    toggle
  }
}