/**
 * PostFetcher.jsx
 * Section 3.2: Loading and Error States
 * 
 * Demonstrates:
 * 1. Three state variables: data, loading, error
 * 2. useEffect to fetch from public API on mount
 * 3. Full state flow: try/catch/finally
 * 4. Conditional rendering for each state
 */

import { useState, useEffect } from 'react'

const PostFetcher = ({ postId = 1 }) => {
  /**
   * Step 1: Create three state variables
   */
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Step 2: useEffect to fetch data on mount
   */
  useEffect(() => {
    const fetchPost = async () => {
      /**
       * Step 3: Full state flow implementation
       * Set loading true before request
       */
      setLoading(true)

      try {
        // Make the request
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        )

        // Check for HTTP errors (Section 3.1 - fetch error handling)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()

        // Try block success: set data and clear error
        setData(result)
        setError(null)

      } catch (err) {
        // Catch block: set error and clear data
        setError(err)
        setData(null)

      } finally {
        // Finally block: set loading false
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  /**
   * Step 4: Conditional rendering for each state
   */
  
  // If loading is true, render loading message
  if (loading) {
    return (
      <div className="post-fetcher loading">
        <div className="loading-scroll">
          <span className="scroll-icon">📜</span>
          <span>Unrolling ancient scrolls...</span>
        </div>
      </div>
    )
  }

  // If error is not null, render error message
  if (error) {
    return (
      <div className="post-fetcher error">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>Error: {error.message}</span>
        </div>
      </div>
    )
  }

  // If data is not null, render the post
  if (data) {
    return (
      <div className="post-fetcher success">
        <h1 className="post-title">{data.title}</h1>
        <p className="post-body">{data.body}</p>
        <div className="post-meta">
          <span>Quest ID: {data.id}</span>
          <span>Author ID: {data.userId}</span>
        </div>
      </div>
    )
  }

  return null
}

export default PostFetcher
