/**
 * Layout.jsx
 * Section 5.2: Nested Routes & Dynamic Params
 * 
 * Root layout component that:
 * - Renders a navigation bar
 * - Renders an <Outlet /> component for nested routes
 */

import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import useLocalStorage from '../hooks/useLocalStorage'
import MouseTracker from './MouseTracker'

const Layout = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [questCount] = useLocalStorage('questCount', 0)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={`dashboard-container theme-${theme}`}>
      {/* Background based on theme */}
      <div className={`parallax-bg ${theme === 'light' ? 'day-bg' : 'night-bg'}`}></div>
      
      {/* Floating particles effect */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="float-particle" 
            style={{
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${3 + Math.random() * 4}s`,
              '--x': `${Math.random() * 100}%`,
            }} 
          />
        ))}
      </div>

      {/* Mouse tracker for magical cursor effect */}
      <MouseTracker />

      {/* Navigation Bar */}
      <nav className="rpg-navbar">
        <div className="nav-left">
          <Link to="/dashboard" className="nav-logo">
            <span className="logo-symbol">⚔️</span>
            <span className="logo-text">BlogDash</span>
          </Link>
        </div>
        
        <div className="nav-center">
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <span className="nav-icon">🏰</span>
            Quest Board
          </Link>
          <Link 
            to="/dashboard/about" 
            className={`nav-link ${location.pathname === '/dashboard/about' ? 'active' : ''}`}
          >
            <span className="nav-icon">📖</span>
            Lore
          </Link>
        </div>

        <div className="nav-right">
          {/* Theme toggle button */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">Lvl {user?.level || 1}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📜</span>
              <span className="stat-value">{questCount} Quests</span>
            </div>
          </div>

          <div className="user-badge">
            <div className="avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Adventurer'}</span>
              <span className="user-class">{user?.class || 'Novice'}</span>
            </div>
          </div>

          <button className="rpg-button secondary logout-btn" onClick={handleLogout}>
            <span>🚪</span> Leave
          </button>
        </div>
      </nav>

      {/* Main Content - Outlet renders nested routes */}
      <main className="dashboard-main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="rpg-footer">
        <div className="footer-content">
          <p>© 2024 BlogDash Realms • Forged with React Magic ⚔️</p>
          <div className="footer-links">
            <span>Section 1: useEffect</span>
            <span>•</span>
            <span>Section 2: useRef</span>
            <span>•</span>
            <span>Section 3: Data Fetching</span>
            <span>•</span>
            <span>Section 4: Forms</span>
            <span>•</span>
            <span>Section 5: Router</span>
            <span>•</span>
            <span>Section 6: Context</span>
            <span>•</span>
            <span>Section 7: Custom Hooks</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
