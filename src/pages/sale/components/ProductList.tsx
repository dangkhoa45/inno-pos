import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import ProductItem from './ProductItem'
import { mockProducts } from '../mockup/data-product'

const ProductList = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        width: '100%',
        border: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 1,
          m: 1,
          height: '866px',
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
          {mockProducts.map((product) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
              key={product.id}
              sx={{ display: 'flex' }}
            >
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}

export default ProductList
