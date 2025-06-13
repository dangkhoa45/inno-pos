import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { mockOrderData, mockCustomerData } from '../../../mockup'

import type { OrderData } from '../../../stores/OrderContext'

interface OrderSummaryProps {
  orderData: OrderData | null
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderData }) => {
  const theme = useTheme()

  // Debug log để kiểm tra dữ liệu
  console.log('OrderSummary received orderData:', orderData)

  // Sử dụng dữ liệu thực nếu có, otherwise fallback to mock data
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

  const customer = displayData.customer || {
    id: mockCustomerData.id,
    name: mockCustomerData.name,
    phone: mockCustomerData.phone,
    email: mockCustomerData.email,
  }

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
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            C
          </Typography>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {customer.name || displayData.orderId}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {customer.phone}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Item Cart Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" fontWeight="bold" mb={2}>
          Item Cart
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.cartItems.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: theme.palette.grey[200],
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        IMG
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="500">
                        {item.product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ItemCode: {item.product.itemCode || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${item.quantity} Cái`}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    VND {item.product.price.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    VND {(item.product.price * item.quantity).toLocaleString()}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    sx={{ minWidth: 'auto', p: 0.5 }}
                  >
                    🗑
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Discount Section */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button
          variant="outlined"
          startIcon="⚙"
          sx={{
            width: '100%',
            borderStyle: 'dashed',
            color: 'text.secondary',
            borderColor: 'grey.300',
          }}
        >
          Add Discount
        </Button>
      </Box>

      {/* Summary */}
      <Box sx={{ p: 2, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Total Quantity</Typography>
          <Typography variant="body2" fontWeight="bold">
            {displayData.totalQuantity}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Net Total</Typography>
          <Typography variant="body2">
            VND {displayData.totalAmount.toLocaleString()}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Grand Total
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            VND {displayData.totalAmount.toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          fullWidth
          sx={{ borderStyle: 'dashed', color: 'primary.main' }}
        >
          Edit Cart
        </Button>
      </Box>
    </Paper>
  )
}

export default OrderSummary
