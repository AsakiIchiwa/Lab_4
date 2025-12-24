/**
 * PostDetail.jsx
 * Section 5.2: Dynamic Routes & useParams
 * Capstone Section 5: Dynamic Routes & useParams
 * 
 * - Uses useParams to read postId from URL
 * - Uses useFetch hook to fetch specific post data
 * - Displays loading/error/data states
 */

import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const PostDetail = () => {
  /**
   * Section 5.2 Step 5: useParams hook
   * Reads the userId (postId) from the URL
   */
  const { postId } = useParams()
  const navigate = useNavigate()

  /**
   * Capstone Section 5: Use useFetch hook again
   * Fetch data for specific post using the postId
   */
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )

  // Also fetch comments for this post
  const { data: comments } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  )

  // Helper functions
  const getQuestRarity = (id) => {
    const numId = parseInt(id)
    if (numId <= 5) return 'legendary'
    if (numId <= 15) return 'epic'
    if (numId <= 30) return 'rare'
    return 'common'
  }

  const getQuestIcon = (id) => {
    const icons = ['⚔️', '🗡️', '🛡️', '🏹', '🔮', '💎', '🗝️', '📜', '🎭', '🌟']
    return icons[parseInt(id) % icons.length]
  }

  const getQuestReward = (id) => {
    const numId = parseInt(id)
    const baseGold = 50 + (100 - numId) * 2
    const baseXP = 100 + (100 - numId) * 5
    return { gold: baseGold, xp: baseXP }
  }

  const rarity = getQuestRarity(postId)
  const icon = getQuestIcon(postId)
  const reward = getQuestReward(postId)

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Unrolling the ancient scroll...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Quest Not Found</h2>
        <p className="error-message">Error: {error.message}</p>
        <button 
          className="rpg-button primary"
          onClick={() => navigate('/dashboard')}
        >
          <span>🏰</span> Return to Quest Board
        </button>
      </div>
    )
  }

  // Data state
  return (
    <div className="post-detail">
      {/* Back navigation */}
      <button 
        className="back-button"
        onClick={() => navigate('/dashboard')}
      >
        <span>←</span> Back to Quest Board
      </button>

      {/* Main quest scroll */}
      <article className={`quest-scroll rarity-${rarity}`}>
        <div className="scroll-top"></div>
        
        <div className="scroll-content">
          {/* Quest header */}
          <header className="quest-detail-header">
            <div className="quest-icon-large">{icon}</div>
            <div className="quest-meta">
              <span className={`rarity-badge ${rarity}`}>{rarity} Quest</span>
              <span className="quest-number">Quest #{postId}</span>
            </div>
          </header>

          {/* Section 5.2: Display the postId */}
          <h1 className="quest-detail-title">{post?.title}</h1>

          <div className="quest-rewards-detail">
            <div className="reward-item">
              <span className="reward-icon-large">💰</span>
              <span className="reward-value">{reward.gold}</span>
              <span className="reward-label">Gold Coins</span>
            </div>
            <div className="reward-item">
              <span className="reward-icon-large">⭐</span>
              <span className="reward-value">{reward.xp}</span>
              <span className="reward-label">Experience</span>
            </div>
            <div className="reward-item">
              <span className="reward-icon-large">🏆</span>
              <span className="reward-value">+1</span>
              <span className="reward-label">Glory</span>
            </div>
          </div>

          <div className="quest-divider">
            <span>✦ Quest Details ✦</span>
          </div>

          <div className="quest-body">
            <p>{post?.body}</p>
          </div>

          {/* Quest objectives */}
          <div className="quest-objectives">
            <h3>
              <span className="section-icon">📋</span>
              Objectives
            </h3>
            <ul>
              <li className="objective">
                <span className="checkbox">☐</span>
                Read the ancient text carefully
              </li>
              <li className="objective">
                <span className="checkbox">☐</span>
                Comprehend the wisdom within
              </li>
              <li className="objective">
                <span className="checkbox">☐</span>
                Share your findings with fellow adventurers
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="quest-actions">
            <button className="rpg-button primary">
              <span>⚔️</span> Accept Quest
            </button>
            <button className="rpg-button secondary">
              <span>📖</span> Add to Journal
            </button>
          </div>
        </div>

        <div className="scroll-bottom"></div>
      </article>

      {/* Comments section - "Fellow Adventurers' Notes" */}
      {comments && comments.length > 0 && (
        <section className="comments-section">
          <h2 className="comments-title">
            <span>💬</span> Fellow Adventurers' Notes ({comments.length})
          </h2>
          
          <div className="comments-list">
            {comments.slice(0, 5).map(comment => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div className="commenter-avatar">
                    {comment.name[0].toUpperCase()}
                  </div>
                  <div className="commenter-info">
                    <span className="commenter-name">{comment.name}</span>
                    <span className="commenter-email">{comment.email}</span>
                  </div>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related quests */}
      <section className="related-quests">
        <h2>
          <span>🗺️</span> Related Quests
        </h2>
        <div className="related-grid">
          {[1, 2, 3].map(offset => {
            const relatedId = Math.max(1, (parseInt(postId) + offset) % 100)
            return (
              <Link 
                key={relatedId}
                to={`/dashboard/post/${relatedId}`}
                className="related-card"
              >
                <span className="related-icon">{getQuestIcon(relatedId)}</span>
                <span className="related-title">Quest #{relatedId}</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default PostDetail
