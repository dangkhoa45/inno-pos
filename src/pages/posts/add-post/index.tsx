import React, { useState } from 'react'

import { addPost } from '@/services/posts.service'
import { useAuth } from '@/stores/AuthContext'

export default function AddPostForm() {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) {
      setError('You must be logged in to add a post.')
      return
    }

    try {
      await addPost({ title, content }, currentUser)
      setTitle('')
      setContent('')
      setError(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form
      onSubmit={handleAddPost}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Add Post</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
