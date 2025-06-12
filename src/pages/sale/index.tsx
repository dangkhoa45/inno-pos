import { useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import CustomerInfo from './components/CustomerInfo'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

import type { CartItem, Customer, Product } from '../../types/sale'

// Custom hook for cart management
const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    if (product.stock === 0) return

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        }
        return prevItems
      }
      return [...prevItems, { product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const removeItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
    getTotalItems,
  }
}

// Utility function for checkout processing
const processCheckout = async (
  customer: Customer | null,
  cartItems: CartItem[],
  total: number,
) => {
  try {
    // TODO: Implement actual checkout API call
    console.log('Processing checkout:', {
      customer,
      items: cartItems,
      total,
      timestamp: new Date().toISOString(),
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: 'Payment successful!' }
  } catch (error) {
    console.error('Checkout error:', error)
    return { success: false, message: 'Payment failed!' }
  }
}

function SalePage() {
  const {
    cartItems,

    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
  } = useCart()

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!')
      return
    }

    try {
      const result = await processCheckout(null, cartItems, getTotal())

      if (result.success) {
        clearCart()
        alert(result.message)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Payment failed!')
    }
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: 'calc(100vh - 110px)',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <Grid size={{ xs: 12, md: 7 }}>
          <ProductList />
        </Grid>

        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <CustomerInfo />
          </Box>

          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <ShoppingCart
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onCheckout={handleCheckout}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SalePage
