/**
 * useLocalStorage.js
 * Section 7.2: Create useLocalStorage Custom Hook
 * 
 * A custom hook similar to useState but syncs with localStorage
 * 
 * Features:
 * 1. Initial value from localStorage or provided default
 * 2. Automatic sync to localStorage on updates
 * 3. JSON parsing/stringifying for complex values
 */

import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  /**
   * Step 2: Initialize state with a function that:
   * - Tries to get item from localStorage
   * - If exists, JSON.parse and return it
   * - If doesn't exist or error, return initialValue
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Step 3: Create setter function that:
   * - Calls setStoredValue with new value
   * - Also saves to localStorage
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function (like useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Save to state
      setStoredValue(valueToStore)
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  /**
   * Step 4: Return array like useState
   */
  return [storedValue, setValue]
}

export default useLocalStorage
