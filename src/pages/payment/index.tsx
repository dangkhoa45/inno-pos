import { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useNavigate } from '@tanstack/react-router'

import { useOrders } from '@/stores/OrdersContext'

import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'
import ReceiptDialog from '../../components/ReceiptDialog'
import { useOrder } from '../../stores/OrderContext'

export default function Payment() {
  const navigate = useNavigate()
  const { orderData, clearOrderData, setOrderData } = useOrder()
  const { addOrder } = useOrders()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [completedPaymentData, setCompletedPaymentData] = useState<{
    paymentMethod: string
    totalPaid: number
    changeAmount: number
    splitPayments?: Array<{ method: string; amount: string }>
  } | null>(null)

  useEffect(() => {
    if (!orderData) {
      navigate({ to: '/sale' })
    }
  }, [orderData, navigate])

  const handleRemoveItem = (productId: string) => {
    if (!orderData) return

    const updatedCartItems = orderData.cartItems.filter(
      (item) => item.product.id !== productId,
    )

    const newTotalAmount = updatedCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )
    const newTotalQuantity = updatedCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    )

    const updatedOrderData = {
      ...orderData,
      cartItems: updatedCartItems,
      totalAmount: newTotalAmount,
      totalQuantity: newTotalQuantity,
    }

    setOrderData(updatedOrderData)

    if (updatedCartItems.length === 0) {
      clearOrderData()
      navigate({ to: '/sale' })
    }
  }

  const handleCompleteOrder = async (paymentData: {
    paymentMethod: string
    totalPaid: number
    changeAmount: number
    splitPayments?: Array<{ method: string; amount: string }>
  }) => {
    if (!orderData) {
      alert('No order data available!')
      return
    }

    // Set loading state
    setIsProcessing(true)

    try {
      // Simulate API call - replace with actual payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store payment data for receipt
      setCompletedPaymentData(paymentData)

      // Show receipt dialog instead of alert
      setShowReceipt(true)
    } catch (_error) {
      alert('An error occurred during payment processing!')
    } finally {
      // Clear loading state
      setIsProcessing(false)
    }
  }

  const handleConfirmReceipt = () => {
    if (orderData) {
      addOrder(orderData)
    }
    setShowReceipt(false)
    setCompletedPaymentData(null)
    clearOrderData()
    navigate({ to: '/sale' })
  }

  const handleCancelReceipt = () => {
    setShowReceipt(false)
    setCompletedPaymentData(null)
    clearOrderData()
    navigate({ to: '/sale' })
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
        <Grid size={{ xs: 12, md: 5 }}>
          <OrderSummary orderData={orderData} onRemoveItem={handleRemoveItem} />
        </Grid>

        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0,
          }}
        >
          <PaymentForm
            orderData={orderData}
            isProcessing={isProcessing}
            onCompleteOrder={handleCompleteOrder}
          />
        </Grid>
      </Grid>

      {/* Receipt Dialog */}
      {completedPaymentData && (
        <ReceiptDialog
          open={showReceipt}
          onConfirm={handleConfirmReceipt}
          onCancel={handleCancelReceipt}
          orderData={orderData}
          paymentData={completedPaymentData}
        />
      )}
    </Container>
  )
}
