import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import DiscountSection from './DiscountSection'

import type { CartItem } from '../../../types/sale'

interface ShoppingCartProps {
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: () => void
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [discount, setDiscount] = React.useState(0)
  const [discountType, setDiscountType] = React.useState<'percent' | 'amount'>(
    'percent',
  )

  React.useEffect(() => {
    if (cartItems.length === 0) {
      setDiscount(0)
      setDiscountType('percent')
    }
  }, [cartItems.length])

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const discountAmount =
    discountType === 'percent' ? (subtotal * discount) / 100 : discount
  const total = Math.max(0, subtotal - discountAmount)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId)
    } else {
      onUpdateQuantity(productId, newQuantity)
    }
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
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography variant="body1" fontWeight="bold" mb={1}>
          Item Cart
        </Typography>
        <Box sx={{ overflow: 'auto', flexGrow: 1, height: 280, mx: -1, px: 1 }}>
          {cartItems.length === 0 ? (
            <Box
              sx={{
                height: '100%',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
              }}
            >
              <ShoppingCartIcon
                sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                No items in the cart
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                overflow: 'auto',
                mb: 2,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#616161',
                  borderRadius: 1,
                },
              }}
            >
              <List dense disablePadding>
                {cartItems.map((item) => (
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
                        <Box
                          sx={{
                            flexGrow: 1,
                            mr: -1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="body2" noWrap>
                            {item.product.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              sx={{ p: 0.25 }}
                            >
                              <RemoveIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                            <Typography
                              variant="caption"
                              sx={{
                                mx: 0.5,
                                minWidth: 16,
                                textAlign: 'center',
                                fontSize: '0.75rem',
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
                              sx={{ p: 0.25 }}
                            >
                              <AddIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mr: 1,
                        }}
                      >
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            sx={{ display: 'block', fontSize: '0.75rem' }}
                          >
                            VND{' '}
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}{' '}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onRemoveItem(item.product.id)}
                          sx={{ p: 0.25 }}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: 1.5 }} />

        <DiscountSection
          discount={discount}
          discountType={discountType}
          onDiscountChange={setDiscount}
          onDiscountTypeChange={setDiscountType}
          disabled={cartItems.length === 0}
        />

        <Box sx={{ mb: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography variant="body2">Total Quantity</Typography>
            <Typography variant="body2" fontWeight="bold">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
                -{discountAmount.toLocaleString()}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Grand Total
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              VND {total.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={onCheckout}
          fullWidth
          disabled={cartItems.length === 0}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
        >
          Checkout
        </Button>
      </CardContent>
    </Paper>
  )
}

export default ShoppingCart
