import { useState, useEffect } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useNavigate } from '@tanstack/react-router'

import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'
import { useOrder } from '../../stores/OrderContext'

export default function Payment() {
  const navigate = useNavigate()
  const { orderData, clearOrderData } = useOrder()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

  // Redirect về sale page nếu không có orderData
  useEffect(() => {
    if (!orderData) {
      console.log('Không có dữ liệu đơn hàng, chuyển hướng về trang bán hàng')
      navigate({ to: '/sale' })
    }
  }, [orderData, navigate])

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method)
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

      // Mock API call để xử lý payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear order data sau khi hoàn tất
      clearOrderData()

      alert('Thanh toán thành công!')

      // Quay về trang chủ hoặc trang sale
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
          <OrderSummary orderData={orderData} />
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
