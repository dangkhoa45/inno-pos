import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import type { Product } from '../../../types/sale'

interface ProductListProps {
  onAddToCart: (product: Product) => void
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'JOKER T-SHIRT ML-TE15',
    price: 240000,
    stock: 10,
    category: 'T-Shirts',
    image: '/api/placeholder/150/150',
  },
  {
    id: '2',
    name: 'HARLEY QUINN T-SHIRT ML',
    price: 240000,
    stock: 0,
    category: 'T-Shirts',
    image: '/api/placeholder/150/150',
  },
  {
    id: '3',
    name: 'YONEX BADMINTON SHIRT',
    price: 0,
    stock: 5,
    category: 'Sports Wear',
    image: '/api/placeholder/150/150',
  },
]

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 2,
          }}
        >
          {mockProducts.map((product) => (
            <Box key={product.id}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {product.stock === 0 && (
                  <Chip
                    label="Out of Stock"
                    color="error"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                    }}
                  />
                )}
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
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                    >
                      {product.price > 0
                        ? `${product.price.toLocaleString()} USD`
                        : 'Free'}
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductList
