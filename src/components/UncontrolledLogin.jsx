/**
 * UncontrolledLogin.jsx
 * Section 2.1: DOM Reference with useRef
 * 
 * Demonstrates:
 * 1. Import and call useRef to create usernameRef
 * 2. Render form with text input and submit button
 * 3. Attach usernameRef to input using ref attribute
 * 4. handleSubmit that alerts value from usernameRef.current.value
 */

import { useRef } from 'react'

const UncontrolledLogin = ({ onSubmit }) => {
  /**
   * Step 1: Create usernameRef using useRef
   */
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  /**
   * Step 4: handleSubmit function
   * - Prevents default form submission
   * - Alerts the value from usernameRef.current.value
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    
    // Alert the values (as per requirement)
    alert(`Username: ${username}\nPassword: ${'*'.repeat(password.length)}`)
    
    // Call parent's onSubmit if provided
    if (onSubmit) {
      onSubmit(username)
    }
  }

  return (
    /**
     * Step 2: Form with text input and submit button
     */
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label className="input-label">Hero Name</label>
        {/* Step 3: Attach usernameRef using ref attribute */}
        <input
          ref={usernameRef}
          type="text"
          className="rpg-input"
          placeholder="Enter your name, brave one..."
        />
      </div>
      
      <div className="input-group">
        <label className="input-label">Secret Rune</label>
        <input
          ref={passwordRef}
          type="password"
          className="rpg-input"
          placeholder="Your mystical password..."
        />
      </div>
      
      <button type="submit" className="rpg-button primary">
        <span className="btn-icon">🗡️</span>
        Begin Quest
        <span className="btn-shine"></span>
      </button>
    </form>
  )
}

export default UncontrolledLogin
