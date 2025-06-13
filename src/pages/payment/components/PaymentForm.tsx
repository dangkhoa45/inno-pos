import React, { useState, useEffect } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import QRCode from '../../../components/QRCode'

import type { OrderData } from '../../../stores/OrderContext'

type PaymentMethod = 'cash' | 'card' | 'bank' | 'ewallet' | 'points'

interface PaymentFormProps {
  orderData: OrderData | null
  selectedPaymentMethod?: string
  onPaymentMethodChange?: (method: string) => void
  onCompleteOrder: () => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  orderData,
  onCompleteOrder,
}) => {
  const grandTotal = orderData?.totalAmount || 0
  const orderId = orderData?.orderId || 'ORDER-001'

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cash')
  const [enableSplitPayment, setEnableSplitPayment] = useState(false)

  const [paidAmount, setPaidAmount] = useState<string>('')
  const [changeAmount, setChangeAmount] = useState<number>(0)
  const [paymentError, setPaymentError] = useState<string>('')

  const [splitPayments, setSplitPayments] = useState<
    { method: PaymentMethod; amount: string }[]
  >([])

  const paymentMethods = [
    { key: 'cash' as PaymentMethod, label: 'Cash' },
    { key: 'card' as PaymentMethod, label: 'Card' },
    { key: 'bank' as PaymentMethod, label: 'Bank Transfer' },
    { key: 'ewallet' as PaymentMethod, label: 'E-wallet' },
    { key: 'points' as PaymentMethod, label: 'Points' },
  ]

  useEffect(() => {
    if (!enableSplitPayment) {
      const paid = parseFloat(paidAmount) || 0
      const change = paid - grandTotal
      setChangeAmount(change)

      if (paid >= grandTotal) {
        setPaymentError('')
      }
    } else {
      const totalPaid = splitPayments.reduce(
        (sum, payment) => sum + (parseFloat(payment.amount) || 0),
        0,
      )
      const change = totalPaid - grandTotal
      setChangeAmount(change)

      if (totalPaid >= grandTotal) {
        setPaymentError('')
      }
    }
  }, [paidAmount, grandTotal, enableSplitPayment, splitPayments])

  const formatMoney = (value: string) => {
    if (!value) return ''

    const cleanValue = value.replace(/[^\d.]/g, '')

    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      return formatMoney(parts[0] + '.' + parts.slice(1).join(''))
    }

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2)
    }

    return parts.join('.')
  }

  const parseMoney = (value: string) => {
    return value.replace(/,/g, '')
  }

  const handlePaymentAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value

    const cleanValue = parseMoney(value)

    if (cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue)) {
      setPaidAmount(cleanValue)
    }
  }

  const handleSplitPaymentChange = (index: number, value: string) => {
    const cleanValue = parseMoney(value)

    if (cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue)) {
      const updatedSplitPayments = [...splitPayments]
      updatedSplitPayments[index].amount = cleanValue
      setSplitPayments(updatedSplitPayments)
    }
  }

  const addSplitPayment = () => {
    setSplitPayments([...splitPayments, { method: 'cash', amount: '' }])
  }

  const removeSplitPayment = (index: number) => {
    setSplitPayments(splitPayments.filter((_, i) => i !== index))
  }

  const handleCompleteOrder = () => {
    let totalPaid = 0

    if (!enableSplitPayment) {
      totalPaid = parseFloat(paidAmount) || 0
    } else {
      totalPaid = splitPayments.reduce(
        (sum, payment) => sum + (parseFloat(payment.amount) || 0),
        0,
      )
    }

    if (totalPaid < grandTotal) {
      setPaymentError(
        `Payment amount must be at least VND ${grandTotal.toLocaleString()}`,
      )
      return
    }

    onCompleteOrder()
  }

  const getQRCodeValue = () => {
    switch (selectedMethod) {
      case 'bank':
        return `bank:${orderId}:${grandTotal}:account123456`
      case 'ewallet':
        return `ewallet:${orderId}:${grandTotal}:wallet123`
      case 'card':
        return `card:${orderId}:${grandTotal}`
      default:
        return `payment:${orderId}:${grandTotal}`
    }
  }

  const isPaymentComplete = enableSplitPayment
    ? splitPayments.reduce(
        (sum, payment) => sum + (parseFloat(payment.amount) || 0),
        0,
      ) >= grandTotal
    : parseFloat(paidAmount) >= grandTotal

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

        {/* Payment Method Selection */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {paymentMethods.map((method) => (
              <Chip
                key={method.key}
                label={method.label}
                variant={selectedMethod === method.key ? 'filled' : 'outlined'}
                color={selectedMethod === method.key ? 'primary' : 'default'}
                onClick={() => setSelectedMethod(method.key)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        {/* Split Payment Toggle */}
        <Box sx={{ mb: 2 }}>
          <Button
            variant={enableSplitPayment ? 'contained' : 'outlined'}
            size="small"
            onClick={() => {
              setEnableSplitPayment(!enableSplitPayment)
              if (!enableSplitPayment) {
                setSplitPayments([
                  { method: 'cash', amount: '' },
                  { method: 'card', amount: '' },
                ])
              } else {
                setSplitPayments([])
              }
            }}
          >
            {enableSplitPayment ? 'Disable' : 'Enable'} Split Payment
          </Button>
        </Box>

        {/* Payment Input */}
        <Box sx={{ border: 2, borderRadius: 1, borderColor: 'divider', p: 2 }}>
          {!enableSplitPayment ? (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {paymentMethods.find((m) => m.key === selectedMethod)?.label}{' '}
                Payment
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter payment amount"
                value={formatMoney(paidAmount)}
                onChange={handlePaymentAmountChange}
                error={!!paymentError}
                helperText={paymentError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">VND</InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {/* Quick Amount Buttons */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setPaidAmount(grandTotal.toString())}
                  sx={{ fontSize: '0.75rem' }}
                >
                  Exact Amount
                </Button>
                {[100000, 200000, 500000, 1000000].map((amount) => (
                  <Button
                    key={amount}
                    size="small"
                    variant="outlined"
                    onClick={() => setPaidAmount(amount.toString())}
                    sx={{ fontSize: '0.75rem' }}
                  >
                    {amount.toLocaleString()}
                  </Button>
                ))}
              </Box>

              {/* Change Display */}
              {paidAmount && changeAmount >= 0 && (
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: 'success.light',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'success.main',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="success.dark"
                    fontWeight="bold"
                  >
                    Change: VND {changeAmount.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Split Payment
              </Typography>
              {splitPayments.map((payment, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  {/* Payment Method Selection for Split */}
                  <Typography
                    variant="caption"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Payment Method {index + 1}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}
                  >
                    {paymentMethods.map((method) => (
                      <Chip
                        key={method.key}
                        label={method.label}
                        size="small"
                        variant={
                          payment.method === method.key ? 'filled' : 'outlined'
                        }
                        color={
                          payment.method === method.key ? 'primary' : 'default'
                        }
                        onClick={() => {
                          const updated = [...splitPayments]
                          updated[index].method = method.key
                          setSplitPayments(updated)
                        }}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>

                  {/* Amount Input */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Enter amount"
                      value={formatMoney(payment.amount)}
                      onChange={(e) =>
                        handleSplitPaymentChange(index, e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">VND</InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => removeSplitPayment(index)}
                      disabled={splitPayments.length <= 1}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      ✕
                    </Button>
                  </Box>

                  {/* Quick amount buttons for split payments */}
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}
                  >
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => {
                        const remainingAmount =
                          grandTotal -
                          splitPayments.reduce(
                            (sum, p, i) =>
                              i !== index
                                ? sum + (parseFloat(p.amount) || 0)
                                : sum,
                            0,
                          )
                        if (remainingAmount > 0) {
                          const updated = [...splitPayments]
                          updated[index].amount = remainingAmount.toString()
                          setSplitPayments(updated)
                        }
                      }}
                      sx={{ fontSize: '0.7rem', minWidth: 'auto', px: 1 }}
                    >
                      Remaining
                    </Button>
                    {[50000, 100000, 200000, 500000].map((amount) => (
                      <Button
                        key={amount}
                        size="small"
                        variant="text"
                        onClick={() => {
                          const updated = [...splitPayments]
                          updated[index].amount = amount.toString()
                          setSplitPayments(updated)
                        }}
                        sx={{ fontSize: '0.7rem', minWidth: 'auto', px: 1 }}
                      >
                        {(amount / 1000).toFixed(0)}k
                      </Button>
                    ))}
                  </Box>
                </Box>
              ))}

              <Button
                size="small"
                variant="outlined"
                onClick={addSplitPayment}
                sx={{ mb: 2 }}
              >
                Add Payment Method
              </Button>

              {/* Split Payment Summary */}
              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: 'grey.50',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Total Paid: VND{' '}
                  {splitPayments
                    .reduce(
                      (sum, payment) => sum + (parseFloat(payment.amount) || 0),
                      0,
                    )
                    .toLocaleString()}
                </Typography>
                {changeAmount >= 0 && (
                  <Typography variant="body2" color="success.main">
                    Change: VND {changeAmount.toLocaleString()}
                  </Typography>
                )}
              </Box>
            </>
          )}

          {/* Error Display for insufficient payment */}
          {((paidAmount && changeAmount < 0) ||
            (enableSplitPayment && changeAmount < 0)) && (
            <Alert severity="error" sx={{ mt: 1 }}>
              Insufficient payment. Need VND{' '}
              {Math.abs(changeAmount).toLocaleString()} more.
            </Alert>
          )}
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
          {/* Dynamic QR Code Component */}
          <Box sx={{ textAlign: 'center' }}>
            <QRCode value={getQRCodeValue()} size={150} showText={true} />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {selectedMethod === 'bank' && 'Bank Transfer QR'}
              {selectedMethod === 'ewallet' && 'E-wallet Payment QR'}
              {selectedMethod === 'card' && 'Card Payment QR'}
              {selectedMethod === 'cash' && 'Order QR Code'}
              {selectedMethod === 'points' && 'Points Payment QR'}
            </Typography>
          </Box>
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
            <Typography
              variant="body2"
              fontWeight="bold"
              color={
                paidAmount || splitPayments.length > 0
                  ? 'primary.main'
                  : 'text.secondary'
              }
            >
              VND{' '}
              {enableSplitPayment
                ? splitPayments
                    .reduce(
                      (sum, payment) => sum + (parseFloat(payment.amount) || 0),
                      0,
                    )
                    .toLocaleString()
                : (parseFloat(paidAmount) || 0).toLocaleString()}
            </Typography>
          </Box>
          {((paidAmount && changeAmount >= 0) ||
            (enableSplitPayment && changeAmount >= 0)) && (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="body2">Change</Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="success.main"
              >
                VND {changeAmount.toLocaleString()}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleCompleteOrder}
            disabled={!isPaymentComplete}
            sx={{
              mt: 1,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              backgroundColor: 'primary.main',
              '&:disabled': {
                backgroundColor: 'grey.300',
                color: 'grey.500',
              },
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
