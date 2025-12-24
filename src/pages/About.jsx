/**
 * About.jsx
 * Section 5.1: Basic Setup
 * 
 * About page (Lore page) that:
 * - Provides information about the app
 * - Uses useNavigate hook for navigation (Step 6)
 */

import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const About = () => {
  /**
   * Section 5.1 Step 6: useNavigate hook
   * Used to navigate programmatically
   */
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="about-page">
      <div className="lore-scroll">
        <div className="scroll-header">
          <span className="scroll-icon">📜</span>
          <h1>The Lore of BlogDash</h1>
        </div>

        <div className="lore-content">
          <section className="lore-section">
            <h2>
              <span className="section-icon">⚔️</span>
              The Legend Begins
            </h2>
            <p>
              In the mystical realm of React, where components dance like 
              magical beings and state flows like ancient rivers, there 
              existed a powerful artifact known as BlogDash. Forged in the 
              fires of intermediate React knowledge, it was destined to 
              guide young developers through the treacherous lands of hooks, 
              routing, and context.
            </p>
          </section>

          <section className="lore-section">
            <h2>
              <span className="section-icon">📚</span>
              The Seven Sacred Sections
            </h2>
            <div className="sections-grid">
              <div className="section-card">
                <span className="card-icon">🔄</span>
                <h3>Section 1: useEffect</h3>
                <p>The Hook of Side Effects - Master the art of synchronizing 
                with external systems and understanding the Effect lifecycle.</p>
              </div>
              
              <div className="section-card">
                <span className="card-icon">🎯</span>
                <h3>Section 2: useRef</h3>
                <p>The DOM Reference - Learn to create refs for DOM elements 
                and understand when to use useRef vs useState.</p>
              </div>
              
              <div className="section-card">
                <span className="card-icon">🌐</span>
                <h3>Section 3: Data Fetching</h3>
                <p>The Art of API Calls - Master fetch vs axios, loading states, 
                error handling, and the async/await patterns.</p>
              </div>
              
              <div className="section-card">
                <span className="card-icon">📝</span>
                <h3>Section 4: Forms</h3>
                <p>Controlled vs Uncontrolled - Understand the two paradigms 
                of form handling in React applications.</p>
              </div>
              
              <div className="section-card">
                <span className="card-icon">🗺️</span>
                <h3>Section 5: React Router</h3>
                <p>The Path of Navigation - Learn nested routes, dynamic 
                params, protected routes, and programmatic navigation.</p>
              </div>
              
              <div className="section-card">
                <span className="card-icon">🌍</span>
                <h3>Section 6: Context API</h3>
                <p>The Global State - Solve prop drilling with Context, 
                create providers, and consume state across components.</p>
              </div>
              
              <div className="section-card">
                <span className="card-icon">🪝</span>
                <h3>Section 7: Custom Hooks</h3>
                <p>The Art of Reusability - Create your own hooks like 
                useLocalStorage and useFetch to share logic.</p>
              </div>
            </div>
          </section>

          <section className="lore-section">
            <h2>
              <span className="section-icon">🛠️</span>
              Technologies of the Realm
            </h2>
            <div className="tech-badges">
              <span className="tech-badge">⚛️ React 18</span>
              <span className="tech-badge">🛣️ React Router v6</span>
              <span className="tech-badge">⚡ Vite</span>
              <span className="tech-badge">🎨 CSS3 Animations</span>
              <span className="tech-badge">🪝 Custom Hooks</span>
              <span className="tech-badge">🌐 Fetch API</span>
            </div>
          </section>

          <section className="lore-section">
            <h2>
              <span className="section-icon">🎮</span>
              Features Implemented
            </h2>
            <ul className="features-list">
              <li>
                <span className="feature-check">✓</span>
                <strong>MouseTracker:</strong> Section 1.3 - useEffect with cleanup
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>Login with Focus:</strong> Section 2.1 & Bonus - useRef for DOM
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>PostFetcher:</strong> Section 3.2 - Loading/Error states
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>ControlledSignup:</strong> Section 4.1 - Controlled forms
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>Nested Routes:</strong> Section 5.2 - Layout with Outlet
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>Dynamic Routes:</strong> Section 5.2 - useParams
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>ProtectedRoute:</strong> Section 5.3 - Auth guard
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>AuthContext:</strong> Section 6.2 - Global auth state
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>ThemeContext:</strong> Section 6.2 - Light/dark theme
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>useLocalStorage:</strong> Section 7.2 - Persistent state
              </li>
              <li>
                <span className="feature-check">✓</span>
                <strong>useFetch:</strong> Capstone - Data fetching hook
              </li>
            </ul>
          </section>

          <section className="lore-section credits">
            <h2>
              <span className="section-icon">🎓</span>
              Course Credits
            </h2>
            <p>
              <strong>Lab 4: Intermediate React</strong><br />
              MSc. Tran Vinh Khiem
            </p>
            <p className="course-note">
              This capstone project demonstrates mastery of all seven sections 
              of the Intermediate React module.
            </p>
          </section>
        </div>

        {/* Section 5.1 Step 6: Button with onClick using useNavigate */}
        <div className="lore-actions">
          <button 
            className="rpg-button primary"
            onClick={handleBackToDashboard}
          >
            <span>🏰</span> Return to Quest Board
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
