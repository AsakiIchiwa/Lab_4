/**
 * ProtectedRoute.jsx
 * Section 5.3: Protected Routes
 * 
 * Pattern for creating a ProtectedRoute wrapper component:
 * - Consumes AuthContext
 * - If isAuthenticated is true: renders children/Outlet
 * - If isAuthenticated is false: uses Navigate to redirect
 */

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  // Consume AuthContext
  const { isAuthenticated } = useAuth()

  /**
   * Section 5.3: Protected Route Logic
   * If not authenticated, redirect to login page
   * The 'replace' prop replaces the current entry in history
   */
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // If authenticated, render children or Outlet for nested routes
  return children ? children : <Outlet />
}

export default ProtectedRoute
