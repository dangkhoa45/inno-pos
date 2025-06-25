import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import type { DiscountOption } from '@/mockup/data-discount'

interface DiscountCardProps {
  option: DiscountOption
  selected?: boolean
  onClick?: () => void
}

const CARD_WIDTH = 355
const CARD_HEIGHT = 83

const DiscountCard: React.FC<DiscountCardProps> = ({
  option,
  selected,
  onClick,
}) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        p: 0,
        borderRadius: 1,
        mb: 1,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        minHeight: CARD_HEIGHT,
        height: CARD_HEIGHT,
        backgroundColor: selected ? '#fffde7' : '#e0e0e0',
        cursor: 'pointer',
        transition: 'border 0.2s, box-shadow 0.2s',
        mx: 'auto',
        position: 'relative',
        overflow: 'visible',
        border: selected ? '1px solid #fbc02d' : 'transparent',
        boxShadow: 0,
      }}
      elevation={0}
      onClick={onClick}
    >
      <Box
        sx={{
          flex: 1,
          px: 2,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {option.title}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: '0.75rem' }}>
          {option.desc}
        </Typography>
        <Typography variant="body2" fontStyle="italic" color="text.secondary">
          Valid until:{' '}
          {option.validTo
            ? new Date(option.validTo).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          minWidth: 120,
          maxWidth: 140,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected ? '#fffde7' : '#e0e0e0',
          borderLeft: '2px dashed #aaa',
          borderRadius: '0 8px 8px 0',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: -12,
            bottom: 0,
            width: 24,
            height: 12,
            backgroundColor: '#fff',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            zIndex: 2,
            boxShadow: '0 0 0 2px transparent',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: -12,
            top: 0,
            width: 24,
            height: 12,
            backgroundColor: '#fff',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            zIndex: 2,
            boxShadow: '0 0 0 2px transparent',
          }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1 }}>
            {option.type === 'percent'
              ? `${option.value}%`
              : option.value.toLocaleString()}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            DISCOUNT
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default DiscountCard
