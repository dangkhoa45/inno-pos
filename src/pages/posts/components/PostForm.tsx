import { useState } from 'react'

import { Button, TextField, Box } from '@mui/material'

type PostFormProps = {
  onSubmit: (data: { title: string; content: string }) => void
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, content })
    setTitle('')
    setContent('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        multiline
        rows={4}
      />
      <Button variant="contained" type="submit">
        Add Post
      </Button>
    </Box>
  )
}
