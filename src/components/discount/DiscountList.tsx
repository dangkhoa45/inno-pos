import React from 'react'

import Grid from '@mui/material/Grid'
import dayjs from 'dayjs'

import {
  mockDiscountOptions,
  type DiscountOption,
} from '@/mockup/data-discount'

import DiscountCard from './DiscountCard'

interface DiscountListProps {
  onSelectDiscount: (option: DiscountOption) => void
  selectedDiscount?: DiscountOption | null
  filter?: {
    saleRange?: number[]
    category?: string[]
    payment?: string[]
    dateRange?: { from: any; to: any }
  }
}

const DiscountList: React.FC<DiscountListProps> = ({
  onSelectDiscount,
  selectedDiscount,
  filter,
}) => {
  const filtered = React.useMemo(() => {
    let result = mockDiscountOptions
    if (filter?.saleRange) {
      result = result.filter(
        (opt) =>
          opt.value >= filter.saleRange![0] &&
          opt.value <= filter.saleRange![1],
      )
    }
    if (filter?.category && filter.category.length > 0) {
      result = result.filter((opt) => filter.category!.includes(opt.category))
    }
    if (filter?.payment && filter.payment.length > 0) {
      result = result.filter((opt) =>
        opt.payment.some((p) => filter.payment!.includes(p)),
      )
    }
    if (filter?.dateRange && (filter.dateRange.from || filter.dateRange.to)) {
      result = result.filter((opt) => {
        const validFrom = dayjs(opt.validFrom)
        const validTo = dayjs(opt.validTo)
        const filterFrom = filter.dateRange!.from
          ? dayjs(filter.dateRange!.from)
          : null
        const filterTo = filter.dateRange!.to
          ? dayjs(filter.dateRange!.to)
          : null
        if (filterFrom && filterTo) {
          return (
            validFrom.isBefore(filterTo.add(1, 'day')) &&
            validTo.isAfter(filterFrom.subtract(1, 'day'))
          )
        }
        if (filterFrom) {
          return validTo.isAfter(filterFrom.subtract(1, 'day'))
        }
        if (filterTo) {
          return validFrom.isBefore(filterTo.add(1, 'day'))
        }
        return true
      })
    }
    return result
  }, [filter])

  return (
    <Grid container spacing={2}>
      {filtered.map((option) => (
        <Grid size={{ xs: 12, sm: 6 }} key={option.id}>
          <DiscountCard
            option={option}
            selected={selectedDiscount?.id === option.id}
            onClick={() => onSelectDiscount(option)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default DiscountList
