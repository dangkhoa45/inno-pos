import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import QRCode from '../../../components/QRCode'
import { mockPaymentAmounts, mockOrderData } from '../../../mockup'

interface PaymentFormProps {
  selectedPaymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onCompleteOrder: () => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
  onCompleteOrder,
}) => {
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

        <TextField
          fullWidth
          label="Tiền mặt"
          variant="outlined"
          defaultValue={`VND ${mockOrderData.grandTotal.toLocaleString()}`}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {mockPaymentAmounts.map((amount) => (
            <Chip
              key={amount}
              label={`VND ${amount.toLocaleString()}`}
              variant={
                selectedPaymentMethod === amount.toString()
                  ? 'filled'
                  : 'outlined'
              }
              onClick={() => onPaymentMethodChange(amount.toString())}
              sx={{ cursor: 'pointer' }}
            />
          ))}
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
            value={`payment:${mockOrderData.id}:${mockOrderData.grandTotal}`}
            size={150}
            showText={true}
          />
        </Box>

        {/* Payment Summary */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Grand Total</Typography>
            <Typography variant="body2" fontWeight="bold">
              VND {mockOrderData.grandTotal.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Paid Amount</Typography>
            <Typography variant="body2" fontWeight="bold">
              VND {mockOrderData.grandTotal.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Change Amount</Typography>
            <Typography variant="body2" fontWeight="bold">
              VND 0
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onCompleteOrder}
            sx={{
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
