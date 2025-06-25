import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'

import { type DiscountOption } from '@/mockup/data-discount'

import DiscountFilterPanel from './DiscountFilterPanel'
import DiscountList from './DiscountList'

interface DiscountPopupProps {
  open: boolean
  onClose: () => void
  onSelectDiscount: (option: DiscountOption | null) => void
  selectedDiscount?: DiscountOption | null
}

export interface DiscountFilter {
  dateRange: { from: any; to: any }
  payment: string[]
  saleRange: number[]
  category: string[]
}

const DiscountPopup: React.FC<DiscountPopupProps> = ({
  open,
  onClose,
  onSelectDiscount,
  selectedDiscount,
}) => {
  const [filter, setFilter] = React.useState<DiscountFilter>({
    dateRange: { from: null, to: null },
    payment: [],
    saleRange: [0, 80],
    category: [],
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{ sx: { overflow: 'visible', maxWidth: '1350px' } }}
    >
      <DialogTitle
        sx={{
          p: 3,
          pb: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box component="span" fontWeight="bold" fontSize={20}>
          Filter by:
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box sx={{ m: 1, overflow: 'visible' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <DiscountFilterPanel filter={filter} setFilter={setFilter} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ height: '70vh', overflowY: 'auto', pr: 1 }}>
              <DiscountList
                onSelectDiscount={onSelectDiscount}
                selectedDiscount={selectedDiscount}
                filter={filter}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default DiscountPopup
