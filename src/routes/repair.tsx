import { createFileRoute } from '@tanstack/react-router'

import RepairPage from '@/pages/repair'

export const Route = createFileRoute('/repair')({
  component: RepairPage,
})
