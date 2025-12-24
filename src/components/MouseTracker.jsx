/**
 * MouseTracker.jsx
 * Section 1.3: The Cleanup Function
 * 
 * Demonstrates:
 * 1. Adding event listener on mount
 * 2. Logging mouse coordinates
 * 3. KEY: Cleanup function to remove event listener
 */

import { useState, useEffect } from 'react'

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState([])

  useEffect(() => {
    /**
     * Step 2: Event listener callback
     * Logs clientX and clientY coordinates
     */
    const handleMouseMove = (e) => {
      console.log(`Mouse position: X=${e.clientX}, Y=${e.clientY}`)
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Create magical trail effect
      setTrail(prev => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
    }

    /**
     * Step 1: Add 'mousemove' event listener to window on mount
     */
    window.addEventListener('mousemove', handleMouseMove)

    /**
     * Step 3: KEY REQUIREMENT - Cleanup Function
     * Remove event listener to prevent memory leak on unmount
     */
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, []) // Empty dependency array - only run on mount

  return (
    <>
      {/* Magical trail particles */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="cursor-trail"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: (index + 1) / trail.length * 0.7,
            transform: `scale(${(index + 1) / trail.length * 0.8})`,
          }}
        />
      ))}
      
      {/* Main cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: position.x, top: position.y }}
      />
    </>
  )
}

export default MouseTracker
