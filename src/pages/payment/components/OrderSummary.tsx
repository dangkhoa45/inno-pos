import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { mockCustomerData, mockOrderData } from '../../../mockup'
import DiscountSection from '../../sale/components/DiscountSection'

import type { OrderData } from '../../../stores/OrderContext'

interface OrderSummaryProps {
  orderData: OrderData | null
  onRemoveItem?: (productId: string) => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderData,
  onRemoveItem,
}) => {
  const theme = useTheme()
  const [discount, setDiscount] = React.useState(0)
  const [discountType, setDiscountType] = React.useState<'percent' | 'amount'>(
    'percent',
  )

  console.log('OrderSummary received orderData:', orderData)

  const handleRemoveItem = (productId: string) => {
    if (onRemoveItem) {
      onRemoveItem(productId)
    }
  }

  const displayData = orderData || {
    customer: null,
    cartItems: mockOrderData.items.map((item) => ({
      product: {
        id: item.id,
        name: item.name,
        price: item.unitPrice,
        itemCode: item.itemCode,
        category: '',
        image: '',
        inStock: true,
        stock: 10,
      },
      quantity: item.quantity,
    })),
    totalAmount: mockOrderData.grandTotal,
    totalQuantity: mockOrderData.totalQuantity,
    orderId: mockOrderData.customerId,
    timestamp: new Date().toISOString(),
  }

  // Use real data calculations when orderData is available
  const subtotal = orderData
    ? orderData.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      )
    : displayData.totalAmount

  const totalQuantity = orderData
    ? orderData.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : displayData.totalQuantity

  const customer = displayData.customer || {
    id: mockCustomerData.id,
    name: mockCustomerData.name,
    phone: mockCustomerData.phone,
    email: mockCustomerData.email,
  }

  // Calculate discount amount and final total
  const discountAmount =
    discountType === 'percent' ? (subtotal * discount) / 100 : discount
  const grandTotal = Math.max(0, subtotal - discountAmount)

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
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        {/* Customer Info Section */}
        <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 48, height: 48 }}>
              <PersonIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {customer.name || displayData.orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {customer.phone}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Item Cart Header */}
        <Typography variant="body1" fontWeight="bold" mb={1}>
          Item Cart
        </Typography>

        {/* Items List */}
        <Box sx={{ overflow: 'auto', flexGrow: 1, height: 280, mx: -1, px: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              mb: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.grey[100],
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.grey[600],
                borderRadius: 1,
              },
            }}
          >
            <List dense disablePadding>
              {displayData.cartItems.map((item) => (
                <ListItem
                  key={item.product.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Box sx={{ width: '100%', py: 0.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {item.product.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            minWidth: 16,
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                          }}
                        >
                          x{item.quantity}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography variant="caption" fontWeight={'bold'}>
                          VND {item.product.price.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight="bold"
                          sx={{ fontSize: '0.75rem' }}
                        >
                          VND{' '}
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          sx={{ p: 0.25 }}
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* Discount Section */}
        <DiscountSection
          discount={discount}
          discountType={discountType}
          onDiscountChange={setDiscount}
          onDiscountTypeChange={setDiscountType}
          disabled={displayData.cartItems.length === 0}
        />

        {/* Summary Section */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography variant="body2">Total Quantity</Typography>
            <Typography variant="body2" fontWeight="bold">
              {totalQuantity}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography variant="body2">Net total</Typography>
            <Typography variant="body2">
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
              <Typography variant="body2" color="error">
                Discount
              </Typography>
              <Typography variant="body2" color="error">
                -VND {discountAmount.toLocaleString()}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Grand Total
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              VND {grandTotal.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  )
}

export default OrderSummary
