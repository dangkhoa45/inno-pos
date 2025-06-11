import { useEffect, useState } from 'react'

import { fetchUserPosts } from '@/services/posts.service'
import { useAuth } from '@/stores/AuthContext'
import type { Post } from '@/types/post'

export default function PostList() {
  const { currentUser } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      if (!currentUser) return
      setLoading(true)
      try {
        const data = await fetchUserPosts(currentUser)
        setPosts(data)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [currentUser])

  if (!currentUser) {
    return <p>Please log in to see your posts.</p>
  }

  if (loading) {
    return <p>Loading posts...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <div>
      <h2>Your Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
