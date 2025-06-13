import { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useNavigate } from '@tanstack/react-router'

import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'
import { useOrder } from '../../stores/OrderContext'

export default function Payment() {
  const navigate = useNavigate()
  const { orderData, clearOrderData, setOrderData } = useOrder()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

  useEffect(() => {
    if (!orderData) {
      console.log('Không có dữ liệu đơn hàng, chuyển hướng về trang bán hàng')
      navigate({ to: '/sale' })
    }
  }, [orderData, navigate])

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method)
  }

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

  const handleCompleteOrder = async () => {
    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán!')
      return
    }

    if (!orderData) {
      alert('Không có dữ liệu đơn hàng!')
      return
    }

    try {
      console.log('Processing final payment:', {
        orderId: orderData.orderId,
        paymentMethod: selectedPaymentMethod,
        totalAmount: orderData.totalAmount,
        customer: orderData.customer,
        items: orderData.cartItems,
        timestamp: new Date().toISOString(),
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearOrderData()

      alert('Thanh toán thành công!')

      navigate({ to: '/sale' })
    } catch (error) {
      console.error('Payment error:', error)
      alert('Có lỗi xảy ra trong quá trình thanh toán!')
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
          <OrderSummary orderData={orderData} onRemoveItem={handleRemoveItem} />
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
          <PaymentForm
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
            onCompleteOrder={handleCompleteOrder}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
