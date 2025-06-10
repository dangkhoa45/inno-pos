import { createFileRoute } from '@tanstack/react-router'

import PostsPage from '@/pages/posts'

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
})
