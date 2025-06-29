import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { getColorWithOpacity } from '../../../theme/theme'

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
  const theme = useTheme()

  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <Card
      variant="outlined"
      onClick={handleAddToCart}
      sx={{
        width: '100%',
        height: { xs: '140px', sm: '160px', md: '180px' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        opacity: product.stock <= 0 ? 0.8 : 1,
        border: isInCart
          ? `2px solid ${theme.palette.primary.main}`
          : '1px solid',
        borderColor: isInCart ? theme.palette.primary.main : 'divider',
        boxShadow: isInCart
          ? `0 0 0 1px ${getColorWithOpacity(theme.palette.primary.main, 0.2)}`
          : 'none',
        '&:hover': {
          boxShadow: isInCart
            ? `0 4px 20px 0 ${getColorWithOpacity(theme.palette.primary.main, 0.3)}`
            : 3,
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
          top: { xs: 4, sm: 8 },
          right: { xs: 4, sm: 8 },
          zIndex: 1,
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          backgroundColor:
            product.stock > 0
              ? theme.palette.success.light
              : product.stock === 0
                ? theme.palette.warning.light
                : theme.palette.error.light,
          color:
            product.stock > 0
              ? theme.palette.success.dark
              : product.stock === 0
                ? theme.palette.warning.dark
                : theme.palette.error.dark,
          fontWeight: '700',
        }}
      />
      <CardMedia
        component="div"
        sx={{
          height: { xs: 60, sm: 80, md: 120 },
          backgroundColor: theme.palette.grey[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
        >
          Product Image
        </Typography>
      </CardMedia>
      <CardContent
        sx={{
          flexGrow: 1,
          p: { xs: 0.5, sm: 1 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="body2"
          noWrap
          sx={{
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
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
          <Typography
            variant="body2"
            fontWeight="700"
            sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
          >
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
