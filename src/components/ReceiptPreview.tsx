import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import type { OrderData } from '../stores/OrderContext'

interface ReceiptPreviewProps {
  orderData: OrderData
  customerSignature: string | null
  staffSignature: string | null
}

const ReceiptPreview = ({
  orderData,
  customerSignature,
  staffSignature,
}: ReceiptPreviewProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  }

  const subtotal = orderData.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#ccc',
        borderRadius: 2,
        p: 3,
        background: 'white',
      }}
    >
      <Box textAlign="center" mb={2}>
        <Typography variant="caption" fontSize={12} fontWeight="medium" mt={1}>
          DONG HO HOSPITAL JSC
        </Typography>
        <Typography variant="body2">
          123 Hoang Hoa Tham Street, Ba Dinh District, Hanoi
        </Typography>
        <Typography variant="body2">Hotline: 1900 1234</Typography>
      </Box>

      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        sx={{ my: 2 }}
      >
        RECEIPT
      </Typography>

      <Box mb={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Order ID:</Typography>
          <Typography variant="body2">{orderData.orderId}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Date:</Typography>
          <Typography variant="body2">
            {formatDate(orderData.timestamp as string)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Customer:</Typography>
          <Typography variant="body2">
            {orderData.customer?.name || '---'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Order Information:
      </Typography>
      {orderData.cartItems.map((item, idx) => (
        <Box key={idx} display="flex" justifyContent="space-between" mb={1}>
          <Box>
            <Typography variant="body2" component="span">
              {item.product.name}
            </Typography>
            <Typography variant="body2" component="span" color="text.secondary">
              {` (x${item.quantity})`}
            </Typography>
          </Box>
          <Typography variant="body2">
            {(item.product.price * item.quantity).toLocaleString()} VND
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="body1" fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {subtotal.toLocaleString()} VND
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={4} mb={2}>
        <Box width="48%" textAlign="center">
          <Typography variant="body2" sx={{ mb: 1 }}>
            Customer
          </Typography>
          <Box
            sx={{
              borderBottom: '1px solid #ccc',
              height: 60,
              mb: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {customerSignature && (
              <img
                src={customerSignature}
                alt="Customer Signature"
                style={{
                  maxWidth: '100%',
                  height: '60px',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            (Sign and print full name)
          </Typography>
        </Box>
        <Box width="48%" textAlign="center">
          <Typography variant="body2" sx={{ mb: 1 }}>
            Staff
          </Typography>
          <Box
            sx={{
              borderBottom: '1px solid #ccc',
              height: 60,
              mb: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {staffSignature && (
              <img
                src={staffSignature}
                alt="Staff Signature"
                style={{
                  maxWidth: '100%',
                  height: '60px',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            (Sign and print full name)
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" textAlign="center" mt={4}>
        Thank you for using Dong Ho Hospital JSC services! <br />
        Please keep this receipt for verification when receiving goods.
      </Typography>
    </Box>
  )
}

export default ReceiptPreview
