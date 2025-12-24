/**
 * Dashboard.jsx
 * Capstone Section 4: Data Fetching & Loading States
 * 
 * - Uses useFetch custom hook
 * - Fetches list of posts from JSONPlaceholder API
 * - Displays Loading/Error/Data states
 * - Posts are Links to dynamic routes
 */

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'

const Dashboard = () => {
  // Use custom useFetch hook to get posts
  const { data: posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  )
  
  // Track quest count in localStorage
  const [questCount, setQuestCount] = useLocalStorage('questCount', 0)

  // Update quest count when posts load
  useEffect(() => {
    if (posts) {
      setQuestCount(posts.length)
    }
  }, [posts, setQuestCount])

  // Helper functions for RPG styling
  const getQuestRarity = (id) => {
    if (id <= 5) return 'legendary'
    if (id <= 15) return 'epic'
    if (id <= 30) return 'rare'
    return 'common'
  }

  const getQuestIcon = (id) => {
    const icons = ['⚔️', '🗡️', '🛡️', '🏹', '🔮', '💎', '🗝️', '📜', '🎭', '🌟']
    return icons[id % icons.length]
  }

  const getQuestReward = (id) => {
    const baseGold = 50 + (100 - id) * 2
    const baseXP = 100 + (100 - id) * 5
    return { gold: baseGold, xp: baseXP }
  }

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Gathering quests from the realm...</p>
        <div className="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Quest Board Unavailable</h2>
        <p className="error-message">Error: {error.message}</p>
        <p className="error-hint">The ancient scrolls could not be retrieved. Try again later.</p>
        <button 
          className="rpg-button primary"
          onClick={() => window.location.reload()}
        >
          <span>🔄</span> Retry Quest
        </button>
      </div>
    )
  }

  // Data state - render posts
  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Quest Board</h1>
          <p className="header-subtitle">Choose your adventure wisely, brave hero</p>
        </div>
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-number">{posts?.length || 0}</span>
            <span className="stat-label">Available Quests</span>
          </div>
        </div>
      </header>

      <div className="quest-filters">
        <span className="filter-label">Filter by rarity:</span>
        <div className="filter-buttons">
          <button className="filter-btn all active">All</button>
          <button className="filter-btn legendary">Legendary</button>
          <button className="filter-btn epic">Epic</button>
          <button className="filter-btn rare">Rare</button>
          <button className="filter-btn common">Common</button>
        </div>
      </div>

      <div className="quests-grid">
        {posts?.slice(0, 20).map(post => {
          const rarity = getQuestRarity(post.id)
          const icon = getQuestIcon(post.id)
          const reward = getQuestReward(post.id)
          
          return (
            /**
             * Link component pointing to dynamic route
             * e.g., /dashboard/post/1
             */
            <Link 
              to={`/dashboard/post/${post.id}`} 
              key={post.id}
              className={`quest-card rarity-${rarity}`}
            >
              <div className="quest-header">
                <span className="quest-icon">{icon}</span>
                <span className={`quest-rarity ${rarity}`}>{rarity}</span>
              </div>
              
              <h3 className="quest-title">{post.title}</h3>
              
              <p className="quest-preview">
                {post.body.substring(0, 80)}...
              </p>
              
              <div className="quest-footer">
                <div className="quest-rewards">
                  <span className="reward gold">
                    <span className="reward-icon">💰</span>
                    {reward.gold}
                  </span>
                  <span className="reward xp">
                    <span className="reward-icon">⭐</span>
                    {reward.xp} XP
                  </span>
                </div>
                <span className="quest-id">Quest #{post.id}</span>
              </div>

              <div className="quest-shine"></div>
            </Link>
          )
        })}
      </div>

      {posts && posts.length > 20 && (
        <div className="load-more">
          <button className="rpg-button secondary">
            <span>📜</span> Load More Quests
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
