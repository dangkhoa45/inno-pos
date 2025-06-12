import { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'

import ProductItem from './ProductItem'
import ProductListHeader from './ProductListHeader'
import { mockProducts } from '../mockup/data-product'

import type { Product, CartItem } from '../../../types/sale'

interface FilterOptions {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  inStockOnly: boolean
}

interface ProductListProps {
  onAddToCart: (product: Product) => void
  cartItems: CartItem[]
}

const ProductList = ({ onAddToCart, cartItems }: ProductListProps) => {
  const theme = useTheme()
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts)

  const handleSearchResults = (products: Product[]) => {
    setFilteredProducts(products)
  }

  const handleFiltersChange = (filters: FilterOptions) => {
    console.log('Filters changed:', filters)
  }

  // Helper function to check if a product is in cart
  const isProductInCart = (productId: string) => {
    return cartItems.some((item) => item.product.id === productId)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: 'calc(100vh - 110px)',
        width: '100%',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <ProductListHeader
        onSearchResults={handleSearchResults}
        onFiltersChange={handleFiltersChange}
      />

      <Box
        sx={{
          p: 1,
          m: 1,
          height: 'calc(100% - 110px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.grey[100],
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.grey[600],
            borderRadius: 1,
          },
        }}
      >
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
              key={product.id}
              sx={{ display: 'flex' }}
            >
              <ProductItem
                product={product}
                onAddToCart={onAddToCart}
                isInCart={isProductInCart(product.id)}
              />
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              color: 'text.secondary',
            }}
          >
            No products found
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default ProductList
