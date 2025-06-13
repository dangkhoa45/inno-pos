import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import QRCode from '../../../components/QRCode'

import type { OrderData } from '../../../stores/OrderContext'

interface PaymentFormProps {
  orderData: OrderData | null
  selectedPaymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onCompleteOrder: () => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  orderData,
  onCompleteOrder,
}) => {
  const grandTotal = orderData?.totalAmount || 0
  const orderId = orderData?.orderId || 'ORDER-001'

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {/* Payment Method Section */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body1" fontWeight="bold" mb={2}>
          Payment Method
        </Typography>
        <Box sx={{ border: 2, borderRadius: 1, borderColor: 'divider', p: 2 }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Cash
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            defaultValue={`VND ${grandTotal.toLocaleString()}`}
          />
        </Box>
      </Paper>

      {/* Additional Information Section */}
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          p: 2,
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body1" fontWeight="bold" mb={2}>
          Additional Information
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.50',
            borderRadius: 1,
            p: 4,
          }}
        >
          {/* QR Code Component */}
          <QRCode
            value={`payment:${orderId}:${grandTotal}`}
            size={150}
            showText={true}
          />
        </Box>

        {/* Payment Summary */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Grand Total</Typography>
            <Typography variant="body2" fontWeight="bold">
              VND {grandTotal.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Paid Amount</Typography>
            <Typography variant="body2" fontWeight="bold">
              VND {grandTotal.toLocaleString()}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onCompleteOrder}
            sx={{
              mt: 1,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              backgroundColor: 'primary.main',
            }}
          >
            Complete Order
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default PaymentForm
