import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  return prefersDarkMode
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchValue, setSearchValue] = useState('cat')

  const toggleDarkTheme = () => {
    const newIsDarkTheme = !isDarkTheme
    setIsDarkTheme(newIsDarkTheme)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.search.value
    if (!searchValue) return
    setSearchValue(searchValue)
    e.target.search.value = ''
  }

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        handleSubmit,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
