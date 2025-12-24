/**
 * LoginPage.jsx
 * Capstone Section 2 & 6 (Bonus):
 * 
 * Login page that:
 * - Consumes AuthContext
 * - Calls login function on button click
 * - Uses useNavigate to redirect to /dashboard
 * 
 * Bonus (Section 6):
 * - Uses useRef for username input
 * - Uses useEffect with [] to focus input on mount
 */

import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ControlledSignup from '../components/ControlledSignup'

const LoginPage = () => {
  /**
   * Bonus: useRef for username input
   */
  const usernameRef = useRef(null)
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  
  const [currentView, setCurrentView] = useState('login')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [particles, setParticles] = useState([])

  /**
   * Bonus: useEffect with empty dependency array
   * Focuses username input on mount
   */
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus()
    }
  }, [])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = usernameRef.current?.value || 'Adventurer'
    
    if (username.trim()) {
      setIsLoggingIn(true)
      
      // Create particle explosion effect
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * -200 - 50,
        delay: Math.random() * 0.5
      }))
      setParticles(newParticles)
      
      // Delay login for animation
      setTimeout(() => {
        login(username)
        navigate('/dashboard')
      }, 1500)
    }
  }

  return (
    <div className="login-container">
      {/* Day background for login */}
      <div className="parallax-bg day-bg"></div>
      
      {/* Animated clouds */}
      <div className="floating-clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      {/* Login particles animation */}
      {isLoggingIn && (
        <div className="login-particles">
          {particles.map(p => (
            <div 
              key={p.id} 
              className="particle"
              style={{
                '--x': `${p.x}px`,
                '--y': `${p.y}px`,
                '--delay': `${p.delay}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main login frame */}
      <div className={`rpg-frame login-frame ${isLoggingIn ? 'logging-in' : ''}`}>
        <div className="frame-corner top-left"></div>
        <div className="frame-corner top-right"></div>
        <div className="frame-corner bottom-left"></div>
        <div className="frame-corner bottom-right"></div>
        
        <div className="frame-border top"></div>
        <div className="frame-border right"></div>
        <div className="frame-border bottom"></div>
        <div className="frame-border left"></div>

        <div className="login-content">
          {/* Game logo */}
          <div className="game-logo">
            <div className="logo-icon">
              <span className="sword-left">⚔️</span>
              <span className="shield">🛡️</span>
              <span className="sword-right">⚔️</span>
            </div>
            <h1 className="game-title">BlogDash</h1>
            <p className="game-subtitle">Chronicle Your Adventures</p>
          </div>

          {/* Tab buttons for login/signup */}
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${currentView === 'login' ? 'active' : ''}`}
              onClick={() => setCurrentView('login')}
            >
              <span>🏰</span> Enter Realm
            </button>
            <button 
              className={`tab-btn ${currentView === 'signup' ? 'active' : ''}`}
              onClick={() => setCurrentView('signup')}
            >
              <span>📜</span> New Hero
            </button>
          </div>

          {/* Login form (Uncontrolled with useRef) */}
          {currentView === 'login' ? (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">👤</span>
                  Hero Name
                </label>
                <input
                  ref={usernameRef}
                  type="text"
                  className="rpg-input"
                  placeholder="Enter your name, brave one..."
                  defaultValue=""
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">🔑</span>
                  Secret Rune
                </label>
                <input
                  type="password"
                  className="rpg-input"
                  placeholder="Your mystical password..."
                />
              </div>

              <button 
                type="submit" 
                className="rpg-button primary"
                disabled={isLoggingIn}
              >
                <span className="btn-icon">🗡️</span>
                {isLoggingIn ? 'Entering Realm...' : 'Begin Quest'}
                <span className="btn-shine"></span>
              </button>
            </form>
          ) : (
            /* Signup form (Controlled Component - Section 4.1) */
            <ControlledSignup onComplete={() => setCurrentView('login')} />
          )}

          {/* Footer text */}
          <div className="login-footer">
            <div className="divider">
              <span className="divider-icon">✦</span>
            </div>
            <p className="footer-text">Tales await the worthy...</p>
            <div className="version-info">
              <span>React Lab 4</span>
              <span>•</span>
              <span>All Sections Implemented</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
