import { useState } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate } from '@tanstack/react-router'

import DialogFormCustomer from './components/addCustomer/DialogFormCustomer'
import CustomerInfo from './components/CustomerInfo'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import FloatingCustomerAvatar from '../../components/FloatingCustomerAvatar'
import SuccessDialog from '../../components/SuccessDialog'
import { useOrder } from '../../stores/OrderContext'

import type { Customer } from '../../mockup'
import type { CartItem, Product } from '../../types/sale'

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
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

const processCheckout = async (
  _customer: Customer | null,
  _cartItems: CartItem[],
  _total: number,
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: 'Payment successful!' }
  } catch (_error) {
    return { success: false, message: 'Payment failed!' }
  }
}

function SalePage() {
  const navigate = useNavigate()
  const { setOrderData } = useOrder()
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
    getTotalItems,
  } = useCart()

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning'>(
    'error',
  )
  // State for create customer dialog
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false)

  const handleCustomerChange = (customer: Customer | null) => {
    setSelectedCustomer(customer)
  }

  // Callback to open create customer dialog
  const handleCreateNewCustomer = () => {
    setOpenCreateCustomer(true)
  }

  const handleCloseCreateCustomer = () => {
    setOpenCreateCustomer(false)
  }

  const handleCheckout = async () => {
    // Validate cart is not empty
    if (cartItems.length === 0) {
      setAlertMessage('Cart is empty! Please add products before checkout.')
      setAlertSeverity('warning')
      setAlertOpen(true)
      return
    }

    // Validate customer is required
    if (!selectedCustomer) {
      setAlertMessage('Please select a customer before checkout!')
      setAlertSeverity('error')
      setAlertOpen(true)
      return
    }

    try {
      const total = getTotal()
      const totalQuantity = getTotalItems()

      // Save order data to context before checkout
      const orderData = {
        customer: selectedCustomer,
        cartItems,
        totalAmount: total,
        totalQuantity,
        orderId: `ORD-${Date.now()}`,
        timestamp: new Date().toISOString(),
      }

      setOrderData(orderData)

      const result = await processCheckout(selectedCustomer, cartItems, total)

      if (result.success) {
        clearCart()
        setSuccessDialogOpen(true)
      } else {
        setAlertMessage(result.message || 'Checkout failed!')
        setAlertSeverity('error')
        setAlertOpen(true)
      }
    } catch (_error) {
      setAlertMessage('An error occurred during checkout!')
      setAlertSeverity('error')
      setAlertOpen(true)
    }
  }

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false)
    // Navigate to payment screen
    navigate({ to: '/payment' })
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: { xs: 'calc(100vh - 80px)', sm: 'calc(100vh - 110px)' },
        width: '100%',
        overflow: 'hidden',
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 8,
            lg: 7,
          }}
          sx={{
            height: { xs: '60vh', sm: '70vh', md: '100%' },
            mb: { xs: 2, md: 0 },
          }}
        >
          <ProductList onAddToCart={addToCart} cartItems={cartItems} />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 4,
            lg: 5,
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: {
              xs: 'calc(40vh - 32px)',
              sm: 'calc(30vh - 32px)',
              md: '100%',
            },
            minHeight: 0,
          }}
        >
          <Box sx={{ mb: { xs: 1, sm: 2 } }}>
            <CustomerInfo
              onCustomerChange={handleCustomerChange}
              onCreateNewCustomer={handleCreateNewCustomer}
            />
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

      <DialogFormCustomer
        open={openCreateCustomer}
        onClose={handleCloseCreateCustomer}
      />

      <SuccessDialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
      />

      <FloatingCustomerAvatar customer={selectedCustomer} />

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default SalePage
