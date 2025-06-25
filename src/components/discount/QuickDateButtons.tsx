import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const quickButtons = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
]

interface QuickDateButtonsProps {
  onQuickSelect?: (type: 'today' | 'week' | 'month') => void
}

const QuickDateButtons: React.FC<QuickDateButtonsProps> = ({
  onQuickSelect,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        mb: 2,
        width: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {quickButtons.map((btn) => (
        <Button
          key={btn.label}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            borderRadius: 1,
            borderColor: 'divider',
            color: 'text.secondary',
          }}
          onClick={() =>
            onQuickSelect?.(btn.value as 'today' | 'week' | 'month')
          }
        >
          {btn.label}
        </Button>
      ))}
    </Box>
  )
}

export default QuickDateButtons
