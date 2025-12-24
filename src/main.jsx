/**
 * main.jsx
 * Section 5.1: React Router Basic Setup
 * - Import createBrowserRouter and RouterProvider
 * - Create router configuration array
 * - Define routes with elements
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Import route components
import Layout from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PostDetail from './pages/PostDetail'
import About from './pages/About'

// Import global styles
import './styles/index.css'
import './styles/variables.css'
import './styles/animations.css'
import './styles/components.css'
import './styles/pages.css'

/**
 * Section 5.2: Nested Routes & Dynamic Params
 * - Root layout component with Outlet
 * - Children array under the root route
 * - Dynamic route with :postId parameter
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'post/:postId',
        element: <PostDetail />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
