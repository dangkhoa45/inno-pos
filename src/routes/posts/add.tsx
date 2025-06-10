import { createFileRoute } from '@tanstack/react-router'

import AddPostForm from '@/pages/posts/add-post'

export const Route = createFileRoute('/posts/add')({
  component: AddPostForm,
})
