import { createFileRoute } from '@tanstack/react-router'

import { TestPage } from '@/pages/test'

export const Route = createFileRoute('/test')({
  component: TestPage,
}) 