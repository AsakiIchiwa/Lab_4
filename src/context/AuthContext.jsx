/**
 * AuthContext.js
 * Section 6.2: Implementing Context - Create
 * 
 * Creates an AuthContext that provides:
 * - isAuthenticated boolean
 * - user object
 * - login function
 * - logout function
 */

import { createContext, useState, useContext } from 'react'

// Create the context with default values
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
})

/**
 * Section 6.2: Implementing Context - Provide
 * AuthProvider wraps the application and provides auth state
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Login function - sets authentication and user data
  const login = (username) => {
    setIsAuthenticated(true)
    setUser({
      name: username,
      level: Math.floor(Math.random() * 50) + 1,
      class: getRandomClass(),
      xp: Math.floor(Math.random() * 1000),
      gold: Math.floor(Math.random() * 500) + 100
    })
  }

  // Logout function - clears authentication
  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Helper function to get random RPG class
const getRandomClass = () => {
  const classes = [
    'Blog Warrior',
    'Mystic Scribe',
    'Shadow Writer',
    'Arcane Blogger',
    'Knight of Posts'
  ]
  return classes[Math.floor(Math.random() * classes.length)]
}

/**
 * Section 6.2: Implementing Context - Consume
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
