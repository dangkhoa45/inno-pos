import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import type { Product } from '../../../types/sale'

interface ProductItemProps {
  product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Chip
        label={`● ${product.stock ?? 0}`}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: '#ffcdd2',
          color: '#b71c1c',
          fontWeight: '700',
        }}
      />
      <CardMedia
        component="div"
        sx={{
          height: 120,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Product Image
        </Typography>
      </CardMedia>
      <CardContent sx={{ flexGrow: 1, p: 1 }}>
        <Typography variant="body2" noWrap>
          {product.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" fontWeight="700">
            {product.price > 0
              ? `VND ${product.price.toLocaleString()}`
              : 'Free'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductItem
