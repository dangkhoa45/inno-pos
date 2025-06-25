import React from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

import CategoryFilter from './CategoryFilter'
import DateRangeFilter from './DateRangeFilter'
import PaymentMethodFilter from './PaymentMethodFilter'
import QuickDateButtons from './QuickDateButtons'
import SaleRangeSlider from './SaleRangeSlider'

import type { DiscountFilter } from './DiscountPopup'

interface DiscountFilterPanelProps {
  filter: DiscountFilter
  setFilter: React.Dispatch<React.SetStateAction<DiscountFilter>>
}

const DiscountFilterPanel: React.FC<DiscountFilterPanelProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <Box
      px={2}
      sx={{
        height: '100%',
        borderRight: '1px solid #ccc',
      }}
    >
      <DateRangeFilter
        value={filter.dateRange}
        onChange={(dateRange) => setFilter((f) => ({ ...f, dateRange }))}
      />
      <QuickDateButtons
        onQuickSelect={(type) => {
          let from = null
          let to = null
          const now = dayjs()
          if (type === 'today') {
            from = now.startOf('day')
            to = now.endOf('day')
          } else if (type === 'week') {
            from = now.startOf('week')
            to = now.endOf('week')
          } else if (type === 'month') {
            from = now.startOf('month')
            to = now.endOf('month')
          }
          setFilter((f) => ({ ...f, dateRange: { from, to } }))
        }}
      />
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} alignItems="center" sx={{ mb: 0.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight="bold">
            Payment Method
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight="bold">
            Sale Range
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 6 }}>
          <PaymentMethodFilter
            hideTitle
            value={filter.payment}
            onChange={(payment) => setFilter((f) => ({ ...f, payment }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SaleRangeSlider
            hideTitle
            value={filter.saleRange}
            onChange={(saleRange) => setFilter((f) => ({ ...f, saleRange }))}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <CategoryFilter
        value={filter.category}
        onChange={(category) => setFilter((f) => ({ ...f, category }))}
      />
    </Box>
  )
}

export default DiscountFilterPanel
