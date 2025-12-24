/**
 * ThemeContext.js
 * Section 6.2: Implementing Context - Theme Switcher
 * 
 * Creates a ThemeContext for light/dark mode switching
 * Default value is 'light'
 */

import { createContext, useState, useContext, useEffect } from 'react'

// Create context with default value 'light'
export const ThemeContext = createContext('light')

/**
 * ThemeProvider component
 * - Provides theme state to all children
 * - Includes toggle function
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark') // RPG theme defaults to dark

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Apply theme class to document body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to consume theme context
 * Section 6.2: Implementing Context - Consume
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
