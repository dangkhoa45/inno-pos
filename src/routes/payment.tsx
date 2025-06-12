import { createFileRoute } from '@tanstack/react-router'

import Payment from '@/pages/payment'

export const Route = createFileRoute('/payment')({
  component: Payment,
})
