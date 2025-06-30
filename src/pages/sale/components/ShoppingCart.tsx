import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { useTheme, alpha } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import DiscountSection from './DiscountSection'
import { SALE_PAYMENT_METHODS } from '../../../types/sale'

import type { CartItem } from '../../../types/sale'

interface ShoppingCartProps {
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: (orderDetails: {
    subtotal: number
    discount: number
    discountType: 'percent' | 'amount'
    discountAmount: number
    vatAmount: number
    redeemPoints: number
    total: number
    selectedPaymentMethod: string
  }) => void
}

// Payment Method Components
const CashIcon = () => (
  <Box sx={{ px: 1, py: 0.5, fontSize: '0.9rem', fontWeight: 'bold' }}>
    Cash
  </Box>
)

const VisaIcon = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
    <Box
      sx={{
        background: 'linear-gradient(to right, #1a1f71, #0f4c8c)',
        color: 'white',
        px: 1.5,
        py: 0.5,
        borderRadius: 0.5,
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
      }}
    >
      VISA
    </Box>
  </Box>
)

const ApplePayIcon = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
    <Box
      sx={{
        background: '#000',
        color: 'white',
        px: 1,
        py: 0.5,
        borderRadius: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        fontSize: '0.85rem',
      }}
    >
      <Box sx={{ fontSize: '1rem' }}>🍎</Box>
      <Box sx={{ fontWeight: '500' }}>Pay</Box>
    </Box>
  </Box>
)

const JCBIcon = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
    <Box
      sx={{
        background: 'linear-gradient(to right, #0066cc, #004499)',
        color: 'white',
        px: 1.5,
        py: 0.5,
        borderRadius: 0.5,
        fontSize: '0.9rem',
        fontWeight: 'bold',
        position: 'relative',
      }}
    >
      JCB
    </Box>
  </Box>
)

const MastercardIcon = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.5,
        borderRadius: 0.5,
        border: '1px solid #ddd',
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 12,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: '#eb001b',
            position: 'absolute',
            left: 0,
          }}
        />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: '#ff5f00',
            position: 'absolute',
            left: 5,
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: '#f79e1b',
            position: 'absolute',
            right: 0,
          }}
        />
      </Box>
    </Box>
  </Box>
)

const PayPalIcon = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
    <Box
      sx={{
        background: 'linear-gradient(to right, #003087, #009cde)',
        color: 'white',
        px: 1.5,
        py: 0.5,
        borderRadius: 0.5,
        fontSize: '0.85rem',
        fontWeight: 'bold',
        position: 'relative',
      }}
    >
      PayPal
    </Box>
  </Box>
)

// Create payment method components mapping
const paymentMethodComponents = {
  cash: CashIcon,
  visa: VisaIcon,
  applepay: ApplePayIcon,
  jcb: JCBIcon,
  mastercard: MastercardIcon,
  paypal: PayPalIcon,
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const theme = useTheme()
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<string>('cash')
  const [redeemPoints, setRedeemPoints] = React.useState<number>(0)
  const [discount, setDiscount] = React.useState(0)
  const [discountType, setDiscountType] = React.useState<'percent' | 'amount'>(
    'percent',
  )

  React.useEffect(() => {
    if (cartItems.length === 0) {
      setDiscount(0)
      setDiscountType('percent')
      setRedeemPoints(0)
    }
  }, [cartItems.length])

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  const discountAmount =
    discountType === 'percent' ? (subtotal * discount) / 100 : discount
  const VAT_RATE = 0.1 // 10% VAT
  const vatAmount = (subtotal - discountAmount) * VAT_RATE
  const total = subtotal - discountAmount + vatAmount - redeemPoints
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId)
    } else {
      onUpdateQuantity(productId, newQuantity)
    }
  }

  const getUOM = (product: any) => {
    return product.uom || 'cái'
  }

  const getItemCode = (product: any) => {
    return product.itemCode || `SP${product.id.slice(-6)}`
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: 2,
        borderColor: theme.palette.primary.main,
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: 0,
          p: { xs: 2, sm: 3 },
          '&:last-child': { pb: { xs: 2, sm: 3 } },
          height: '100%',
        }}
      >
        {/* Cart Items Table */}
        <TableContainer
          sx={{
            flexGrow: 1,
            mb: 2,
            maxHeight: '300px',
            overflow: 'auto',
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 'bold', fontSize: '0.9rem', minWidth: 140 }}
                >
                  Item
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    minWidth: 60,
                  }}
                >
                  UOM
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    minWidth: 100,
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'right',
                    minWidth: 100,
                  }}
                >
                  Unit Price
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'right',
                    minWidth: 100,
                  }}
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                    <ShoppingCartIcon
                      sx={{
                        fontSize: 32,
                        color: 'text.secondary',
                        mb: 1,
                        display: 'block',
                        mx: 'auto',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      No items in the cart
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                cartItems.map((item) => (
                  <TableRow key={item.product.id}>
                    {/* Item Column */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Avatar
                          src={item.product.image}
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: theme.palette.grey[200],
                          }}
                        >
                          📦
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              lineHeight: 1.2,
                              maxWidth: 120,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.product.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.7rem' }}
                          >
                            Item Code: {getItemCode(item.product)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* UOM Column */}
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {getUOM(item.product)}
                      </Typography>
                    </TableCell>

                    {/* Quantity Column */}
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity - 1,
                            )
                          }
                          sx={{ p: 0.5, minWidth: 24, height: 24 }}
                        >
                          <RemoveIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            minWidth: 24,
                            textAlign: 'center',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity + 1,
                            )
                          }
                          sx={{ p: 0.5, minWidth: 24, height: 24 }}
                        >
                          <AddIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </TableCell>

                    {/* Unit Price Column */}
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        VND {item.product.price.toLocaleString()}
                      </Typography>
                    </TableCell>

                    {/* Amount Column */}
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '0.8rem', fontWeight: 500 }}
                      >
                        VND{' '}
                        {(item.product.price * item.quantity).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Payment Methods */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ mb: 1, fontSize: '0.9rem' }}
          >
            Payment Method
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {SALE_PAYMENT_METHODS.map((method) => {
              const IconComponent =
                paymentMethodComponents[
                  method.id as keyof typeof paymentMethodComponents
                ]
              return (
                <Box
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  sx={{
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor:
                      selectedPaymentMethod === method.id
                        ? theme.palette.primary.main
                        : '#e0e0e0',
                    borderRadius: 1,
                    bgcolor:
                      selectedPaymentMethod === method.id
                        ? alpha(theme.palette.primary.main, 0.1)
                        : 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    },
                    minWidth: {
                      xs: method.id === 'cash' ? 60 : 80,
                      sm: method.id === 'cash' ? 70 : 90,
                    },
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent />
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* Promotions/Discount Section */}
        <DiscountSection
          discount={discount}
          discountType={discountType}
          onDiscountChange={setDiscount}
          onDiscountTypeChange={setDiscountType}
          disabled={cartItems.length === 0}
        />

        {/* Summary */}
        <Box>
          {/* Total Quantity */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              Total Quantity
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: '0.85rem' }}
            >
              {totalQuantity}
            </Typography>
          </Box>

          {/* Net Total */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              Net Total
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              VND {subtotal.toLocaleString()}
            </Typography>
          </Box>

          {/* Discount */}
          {discountAmount > 0 && (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography
                variant="body2"
                color="error"
                sx={{ fontSize: '0.85rem' }}
              >
                Discount {discountType === 'percent' ? `(${discount}%)` : ''}
              </Typography>
              <Typography
                variant="body2"
                color="error"
                sx={{ fontSize: '0.85rem' }}
              >
                -VND {discountAmount.toLocaleString()}
              </Typography>
            </Box>
          )}

          {/* VAT */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              VAT (10%)
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              VND {vatAmount.toLocaleString()}
            </Typography>
          </Box>

          {/* Redeem */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              Redeem
            </Typography>
            <TextField
              size="small"
              type="number"
              value={redeemPoints}
              onChange={(e) => setRedeemPoints(Number(e.target.value) || 0)}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  height: 28,
                  fontSize: '0.8rem',
                },
              }}
              inputProps={{
                min: 0,
                max: subtotal + vatAmount,
                style: { textAlign: 'right', padding: '4px 8px' },
              }}
            />
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Grand Total */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: '1.1rem' }}
            >
              Grand Total
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: '1.1rem' }}
            >
              VND {Math.max(0, total).toLocaleString()}
            </Typography>
          </Box>

          {/* Checkout Button */}
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (cartItems.length === 0 || !selectedPaymentMethod) return

              onCheckout({
                subtotal,
                discount,
                discountType,
                discountAmount,
                vatAmount,
                redeemPoints,
                total,
                selectedPaymentMethod,
              })
            }}
            fullWidth
            disabled={cartItems.length === 0 || !selectedPaymentMethod}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              bgcolor: '#1976d2',
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: '#1565c0',
              },
            }}
          >
            CHECK OUT
          </Button>
        </Box>
      </CardContent>
    </Paper>
  )
}

export default ShoppingCart
