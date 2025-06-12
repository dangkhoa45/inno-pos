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
  onAddToCart: (product: Product) => void
  isInCart: boolean
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  isInCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <Card
      variant="outlined"
      onClick={handleAddToCart}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        opacity: product.stock <= 0 ? 0.8 : 1,
        border: isInCart ? '2px solid #1976d2' : '1px solid',
        borderColor: isInCart ? '#1976d2' : 'divider',
        boxShadow: isInCart ? '0 0 0 1px rgba(25, 118, 210, 0.2)' : 'none',
        '&:hover': {
          boxShadow: isInCart ? '0 4px 20px 0 rgba(25, 118, 210, 0.3)' : 3,
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0px)',
        },
      }}
    >
      <Chip
        label={`● ${product.stock}`}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor:
            product.stock > 0
              ? '#c8e6c9'
              : product.stock === 0
                ? '#fff3cd'
                : '#ffcdd2',
          color:
            product.stock > 0
              ? '#2e7d32'
              : product.stock === 0
                ? '#856404'
                : '#b71c1c',
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
      <CardContent
        sx={{
          flexGrow: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" noWrap sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
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
