import * as React from 'react'

type AppContextType = {
  drawerOpen: boolean
  toggleDrawer: () => void
}

export const AppContext = React.createContext<AppContextType>({
  drawerOpen: false,
  toggleDrawer: () => null
})

export const useAppContext = (): AppContextType => React.useContext(AppContext)

const AppProvider: React.FC<{}> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }

  return <AppContext.Provider value={{ drawerOpen, toggleDrawer }}>{children}</AppContext.Provider>
}

export default AppProvider
