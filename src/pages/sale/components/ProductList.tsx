import { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import ProductItem from './ProductItem'
import ProductListHeader from './ProductListHeader'
import { mockProducts } from '../mockup/data-product'

import type { Product } from '../../../types/sale'

interface FilterOptions {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  inStockOnly: boolean
}

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts)

  const handleSearchResults = (products: Product[]) => {
    setFilteredProducts(products)
  }

  const handleFiltersChange = (filters: FilterOptions) => {
    console.log('Filters changed:', filters)
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
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#616161',
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
              <ProductItem product={product} />
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
