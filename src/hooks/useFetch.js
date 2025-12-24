/**
 * useFetch.js
 * Capstone Section 4: Data Fetching Custom Hook
 * 
 * Custom hook that manages:
 * - data state
 * - loading state  
 * - error state
 * 
 * Section 3.2: Implements full loading and error state flow
 */

import { useState, useEffect } from 'react'

const useFetch = (url) => {
  // Create three state variables (Section 3.2)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Don't fetch if no URL provided
    if (!url) {
      setLoading(false)
      return
    }

    // Create abort controller for cleanup
    const abortController = new AbortController()

    const fetchData = async () => {
      // Set loading true before request (good practice for re-fetching)
      setLoading(true)

      try {
        // Make the request
        const response = await fetch(url, {
          signal: abortController.signal
        })

        /**
         * Section 3.1: fetch error handling
         * With fetch, 404 doesn't trigger catch block
         * Must manually check response.ok
         */
        if (!response.ok) {
          throw new Error(`Quest failed! The scrolls returned error ${response.status}`)
        }

        // Parse JSON response
        const result = await response.json()

        // On success: set data and clear error
        setData(result)
        setError(null)

      } catch (err) {
        // Don't set error if request was aborted
        if (err.name === 'AbortError') {
          return
        }
        
        // In catch block: set error and clear data
        setError(err)
        setData(null)

      } finally {
        // In finally block: set loading false
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup function to abort fetch on unmount
    return () => {
      abortController.abort()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
