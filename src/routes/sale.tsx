import { createFileRoute } from '@tanstack/react-router'

import SalePage from '@/pages/sale'

export const Route = createFileRoute('/sale')({
  component: SalePage,
})
