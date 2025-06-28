import { createFileRoute } from '@tanstack/react-router';
import TraHangPage from '@/pages/trahang/trahang';

export const Route = createFileRoute('/trahang')({
    component: TraHangPage,
    validateSearch: (search: Record<string, unknown>) => ({
      invoiceId: (search.invoiceId as string) || undefined,
    }),
  });