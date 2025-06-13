import { useState } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate } from '@tanstack/react-router'

import CustomerInfo from './components/CustomerInfo'
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'
import SuccessDialog from '../../components/SuccessDialog'
import { useOrder } from '../../stores/OrderContext'

import type { CartItem, Customer, Product } from '../../types/sale'

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
  customer: Customer | null,
  cartItems: CartItem[],
  total: number,
) => {
  try {
    console.log('Processing checkout:', {
      customer,
      items: cartItems,
      total,
      timestamp: new Date().toISOString(),
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: 'Payment successful!' }
  } catch (error) {
    console.error('Checkout error:', error)
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

  const handleCustomerChange = (customer: Customer | null) => {
    setSelectedCustomer(customer)
  }

  const handleCheckout = async () => {
    // Validate cart không rỗng
    if (cartItems.length === 0) {
      setAlertMessage(
        'Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.',
      )
      setAlertSeverity('warning')
      setAlertOpen(true)
      return
    }

    // Validate bắt buộc phải có customer
    if (!selectedCustomer) {
      setAlertMessage('Vui lòng chọn khách hàng trước khi thanh toán!')
      setAlertSeverity('error')
      setAlertOpen(true)
      return
    }

    try {
      const total = getTotal()
      const totalQuantity = getTotalItems()

      // Lưu dữ liệu order vào context trước khi checkout
      const orderData = {
        customer: selectedCustomer,
        cartItems,
        totalAmount: total,
        totalQuantity,
        orderId: `ORD-${Date.now()}`,
        timestamp: new Date().toISOString(),
      }

      console.log('Sale page - Saving orderData to context:', orderData)
      setOrderData(orderData)

      const result = await processCheckout(selectedCustomer, cartItems, total)

      if (result.success) {
        clearCart()
        setSuccessDialogOpen(true)
      } else {
        setAlertMessage(result.message || 'Thanh toán thất bại!')
        setAlertSeverity('error')
        setAlertOpen(true)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setAlertMessage('Có lỗi xảy ra trong quá trình thanh toán!')
      setAlertSeverity('error')
      setAlertOpen(true)
    }
  }

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false)
    // Chuyển sang màn hình thanh toán
    navigate({ to: '/payment' })
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
          <ProductList onAddToCart={addToCart} cartItems={cartItems} />
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
            <CustomerInfo onCustomerChange={handleCustomerChange} />
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

      <SuccessDialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
      />

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
