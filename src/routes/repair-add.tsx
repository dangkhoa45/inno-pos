import { createFileRoute } from '@tanstack/react-router'

import AddRepairPage from '@/pages/repair/add'

export const Route = createFileRoute('/repair-add')({
  component: AddRepairPage,
}) 