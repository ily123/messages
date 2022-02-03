import React, { useState } from 'react'

const SideBarToggleContext = React.createContext()

const SideBarToggleContextProvider = ({ children }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false)
  return (
    <SideBarToggleContext.Provider
      value={{ sideBarToggle, setSideBarToggle }}
    >
      {children}
    </SideBarToggleContext.Provider>
  )
}

export default SideBarToggleContextProvider
