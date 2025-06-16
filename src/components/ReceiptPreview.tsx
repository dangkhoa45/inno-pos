import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import PrintIcon from '@mui/icons-material/Print'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import type { OrderData } from '../stores/OrderContext'

interface PaymentData {
  paymentMethod: string
  totalPaid: number
  changeAmount: number
  splitPayments?: Array<{ method: string; amount: string }>
}

interface ReceiptPreviewProps {
  open: boolean
  onClose: () => void
  orderData: OrderData | null
  paymentData: PaymentData | null
  onPrint?: () => void
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  open,
  onClose,
  orderData,
  paymentData,
  onPrint,
}) => {
  if (!orderData || !paymentData) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  }

  const total = orderData.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography fontWeight="bold" variant="body1">
          Xem trước biên nhận
        </Typography>
        <Box display="flex" gap={1}>
          <Button size="small" variant="outlined">
            Chữ ký khách hàng
          </Button>
          <Button size="small" variant="outlined">
            Chữ ký nhân viên
          </Button>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {/* Logo + Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ mb: 1 }}>
            <img
              src="/logo-placeholder.png"
              alt="Logo"
              style={{ width: 60, height: 60 }}
            />
          </Box>
          <Typography variant="body2">
            123 Đường Hoàng Hoa Thám, Quận Ba Đình, Hà Nội
          </Typography>
          <Typography variant="body2">Hotline: 1900 1234</Typography>
        </Box>

        {/* Tiêu đề */}
        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={3}>
          BIÊN NHẬN
        </Typography>

        {/* Thông tin đơn hàng */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            Số đơn hàng: <strong>{orderData.orderId}</strong>
          </Typography>
          <Typography variant="body2">
            Ngày: <strong>{formatDate(orderData.timestamp as string)}</strong>
          </Typography>
          <Typography variant="body2">
            Khách hàng: <strong>{orderData.customer?.name || '---'}</strong>
          </Typography>
        </Box>

        {/* Chi tiết dịch vụ */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" fontWeight="bold" mb={1}>
          Thông tin đơn hàng:
        </Typography>
        {orderData.cartItems.map((item, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
          >
            <Typography variant="body2">{item.product.name}</Typography>
            <Typography variant="body2">
              {(item.product.price * item.quantity).toLocaleString()} VND
            </Typography>
          </Box>
        ))}

        {/* Tổng tiền */}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" fontWeight="bold">
            Tổng cộng:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {total.toLocaleString()} VND
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} size="large">
          Đóng
        </Button>
        <Button
          variant="contained"
          onClick={onPrint}
          startIcon={<PrintIcon />}
          size="large"
        >
          In biên nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReceiptPreview
