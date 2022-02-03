import React, { useState } from 'react'

export const SideBarToggleContext = React.createContext()

const SideBarToggleContextProvider = ({ children }) => {
  const [isSideBarToggled, toggleSideBar] = useState(false)
  return (
    <SideBarToggleContext.Provider
      value={{ isSideBarToggled, toggleSideBar }}
    >
      {children}
    </SideBarToggleContext.Provider>
  )
}

export default SideBarToggleContextProvider
