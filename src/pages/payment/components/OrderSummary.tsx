import React from 'react'

import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import type { OrderData } from '../../../stores/OrderContext'

interface OrderSummaryProps {
  orderData: OrderData | null
  onRemoveItem?: (productId: string) => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderData,
  onRemoveItem: _onRemoveItem,
}) => {
  const theme = useTheme()

  // Early return if no order data
  if (!orderData) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: 1,
          borderColor: 'divider',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No order data available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please go back to the sale page
        </Typography>
      </Paper>
    )
  }

  // Use orderData directly - all calculations are done in sale page
  const {
    customer,
    cartItems,
    subtotal,
    discount,
    discountType,
    discountAmount,
    vatAmount,
    redeemPoints,
    totalAmount: grandTotal,
    totalQuantity,
  } = orderData

  const getUOM = (product: any) => {
    return product.uom || 'PCS'
  }

  const getItemCode = (product: any) => {
    return product.itemCode || product.id.substring(0, 8).toUpperCase()
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
          height: '100%',
          p: 2,
          '&:last-child': { pb: 0 },
        }}
      >
        <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 48, height: 48 }}>
              <PersonIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {customer?.name || 'Guest Customer'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {customer?.phone || 'No phone number'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <TableContainer
          sx={{
            mb: 2,
            maxHeight: cartItems.length > 3 ? '240px' : 'auto',
            minHeight: '120px',
            overflow: 'auto',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
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

                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {getUOM(item.product)}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          bgcolor: theme.palette.grey[100],
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          minWidth: 24,
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        VND {item.product.price.toLocaleString()}
                      </Typography>
                    </TableCell>

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

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ mt: 'auto' }}>
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: theme.palette.grey[50],
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ mb: 1, fontSize: '0.9rem' }}
            >
              Promotions/Discount
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Discount Type:{' '}
                {discountType === 'percent' ? 'Percentage' : 'Fixed Amount'}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {discountType === 'percent'
                  ? `${discount}%`
                  : `VND ${discount.toLocaleString()}`}
              </Typography>
            </Box>
            {redeemPoints > 0 && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Redeem Points:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  VND {redeemPoints.toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
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

            {discountAmount > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
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

            {vatAmount > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  VAT (10%)
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  VND {vatAmount.toLocaleString()}
                </Typography>
              </Box>
            )}

            {redeemPoints > 0 && (
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Redeem Points
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontSize: '0.85rem' }}
                >
                  -VND {redeemPoints.toLocaleString()}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
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
                VND {Math.max(0, grandTotal).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  )
}

export default OrderSummary
