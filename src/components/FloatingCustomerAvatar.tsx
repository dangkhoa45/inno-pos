import React from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, Typography, IconButton } from '@mui/material'

import type { Customer } from '../mockup'

interface FloatingCustomerAvatarProps {
  customer: Customer | null
  onClick?: () => void
}

const FloatingCustomerAvatar: React.FC<FloatingCustomerAvatarProps> = ({
  customer,
  onClick,
}) => {
  if (!customer) return null
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 24,
        bottom: 24,
        zIndex: 2000,
        width: 200,
        height: 200,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 4,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
        '&:hover': onClick ? { boxShadow: 8, filter: 'brightness(1.08)' } : {},
        background: '#222',
      }}
      onClick={onClick}
    >
      <img
        src={customer.avatar}
        alt={customer.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 12,
          display: 'block',
        }}
      />
      {/* Icon info góc phải trên */}
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          bgcolor: 'rgba(0,0,0,0.45)',
          color: '#fff',
          p: 0.5,
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (onClick) onClick()
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
      {/* Tên khách hàng */}
      <Typography
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 6,
          color: '#fff',
          fontWeight: 600,
          fontSize: 16,
          textAlign: 'center',
          textShadow: '0 2px 8px #000, 0 1px 2px #000',
          px: 1,
          pointerEvents: 'none',
        }}
        noWrap
      >
        {customer.name}
      </Typography>
    </Box>
  )
}

export default FloatingCustomerAvatar
