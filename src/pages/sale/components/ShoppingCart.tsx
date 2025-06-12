import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
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
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Item Cart ({cartItems.length})</Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Box
            sx={{
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
          <>
            <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
              <List dense>
                {cartItems.map((item) => (
                  <ListItem
                    key={item.product.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      p: 1,
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <Typography variant="body2" fontWeight="bold" noWrap>
                            {item.product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.product.category}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onRemoveItem(item.product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="body2"
                            sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}
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
                            disabled={item.quantity >= item.product.stock}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>

                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="primary"
                        >
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}{' '}
                          USD
                        </Typography>
                      </Box>

                      <Typography variant="caption" color="text.secondary">
                        Unit Price: {item.product.price.toLocaleString()} USD
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
        <Divider sx={{ mb: 2 }} />

        {/* Discount Section */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocalOfferIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" fontWeight="bold">
              Discount
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value) || 0)}
              inputProps={{ min: 0 }}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant={discountType === 'percent' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setDiscountType('percent')}
            >
              %
            </Button>
            <Button
              variant={discountType === 'amount' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setDiscountType('amount')}
            >
              USD
            </Button>
          </Box>
        </Box>

        {/* Total Section */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">
              {subtotal.toLocaleString()} USD
            </Typography>
          </Box>

          {discountAmount > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography variant="body2" color="error">
                Discount:
              </Typography>
              <Typography variant="body2" color="error">
                -{discountAmount.toLocaleString()} USD
              </Typography>
            </Box>
          )}

          <Divider sx={{ mb: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {total.toLocaleString()} USD
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
