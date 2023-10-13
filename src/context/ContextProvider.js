import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

const initialState = {
    cart: false,
    userProfile: false,
    notification: false
}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true)
    const [activeSidebarCrud, setActiveSidebarCrud] = useState(false)
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [idEdit, setIdEdit] = useState()

    const handleClick = ( clicked ) => {
        setIsClicked({ ...initialState, [clicked]: true })
    }

    const changeIdEdit = (id) => {
        setIdEdit(id)
    }

    return (
        <StateContext.Provider
            value={{ 
                activeMenu, setActiveMenu, activeSidebarCrud, setActiveSidebarCrud, isClicked, idEdit, changeIdEdit, setIsClicked, handleClick,screenSize, setScreenSize
            }}
        >
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext  = () => useContext(StateContext)