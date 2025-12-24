/**
 * ControlledSignup.jsx
 * Section 4.1: Controlled Components
 * 
 * Demonstrates:
 * 1. useState with single state object { email: '', password: '' }
 * 2. Form with two input fields
 * 3. Controlled component pattern:
 *    - value prop tied to state
 *    - name attribute matching state key
 *    - Single handleChange function using event.target.name/value
 * 4. onSubmit handler that logs formData
 */

import { useState } from 'react'

const ControlledSignup = ({ onComplete }) => {
  /**
   * Step 1: Create single state object for form data
   */
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    heroClass: 'warrior'
  })
  
  const [submitted, setSubmitted] = useState(false)

  /**
   * Step 3c: Single handleChange function
   * Uses event.target.name and event.target.value
   * to dynamically update correct key in formData
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  /**
   * Step 4: onSubmit handler
   * - Prevents default submission
   * - Logs formData to console
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data Submitted:', formData)
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onComplete?.()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="signup-success">
        <div className="success-icon">✨</div>
        <p>Hero Registered!</p>
        <p className="success-sub">Prepare for adventure...</p>
      </div>
    )
  }

  return (
    /**
     * Step 2: Form with email and password inputs
     */
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label className="input-label">Messenger Scroll (Email)</label>
        <input
          type="email"
          /**
           * Step 3b: name attribute matches state key
           */
          name="email"
          /**
           * Step 3a: value prop tied to state
           */
          value={formData.email}
          onChange={handleChange}
          className="rpg-input"
          placeholder="your@scroll.magic"
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label">Secret Rune (Password)</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="rpg-input"
          placeholder="Create your mystical key..."
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label">Choose Your Class</label>
        <select
          name="heroClass"
          value={formData.heroClass}
          onChange={handleChange}
          className="rpg-input rpg-select"
        >
          <option value="warrior">⚔️ Warrior Scribe</option>
          <option value="mage">🔮 Mystic Blogger</option>
          <option value="ranger">🏹 Wandering Writer</option>
          <option value="healer">💚 Sage Storyteller</option>
        </select>
      </div>

      <button type="submit" className="rpg-button primary">
        <span className="btn-icon">📜</span>
        Register Hero
        <span className="btn-shine"></span>
      </button>
    </form>
  )
}

export default ControlledSignup
