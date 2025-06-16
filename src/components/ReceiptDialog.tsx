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

interface ReceiptDialogProps {
  open: boolean
  onClose: () => void
  orderData: OrderData | null
  paymentData: {
    paymentMethod: string
    totalPaid: number
    changeAmount: number
    splitPayments?: Array<{ method: string; amount: string }>
  }
}

const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  open,
  onClose,
  orderData,
  paymentData,
}) => {
  console.log('🚀 ~ paymentData:', paymentData)
  if (!orderData) return null

  const handlePrint = () => window.print()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  }

  const subtotal = orderData.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <DialogTitle sx={{ px: 3, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold">Xem trước biên nhận</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" gap={1} mt={2}>
          <Button size="small" variant="outlined">
            Xem trước
          </Button>
          <Button size="small" variant="outlined">
            Chữ ký khách hàng
          </Button>
          <Button size="small" variant="outlined">
            Chữ ký nhân viên
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, py: 3 }}>
        {/* Logo + Header */}
        <Box textAlign="center" mb={2}>
          <img
            src="/logo-placeholder.png"
            alt="Logo"
            style={{ width: 50, height: 50 }}
          />
          <Typography
            variant="caption"
            fontSize={12}
            fontWeight="medium"
            mt={1}
          >
            BỆNH VIỆN ĐỒNG HỒ JSC
          </Typography>
          <Typography variant="body2">
            123 Đường Hoàng Hoa Thám, Quận Ba Đình, Hà Nội
          </Typography>
          <Typography variant="body2">Hotline: 1900 1234</Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          sx={{ my: 2 }}
        >
          BIÊN NHẬN
        </Typography>

        {/* Info */}
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Số đơn hàng:</Typography>
            <Typography variant="body2">{orderData.orderId}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Ngày:</Typography>
            <Typography variant="body2">
              {formatDate(orderData.timestamp as string)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Khách hàng:</Typography>
            <Typography variant="body2">
              {orderData.customer?.name || '---'}
            </Typography>
          </Box>
        </Box>

        {/* Items */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" fontWeight="bold" mb={1}>
          Thông tin đơn hàng:
        </Typography>
        {orderData.cartItems.map((item, idx) => (
          <Box key={idx} display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">{item.product.name}</Typography>
            <Typography variant="body2">
              {(item.product.price * item.quantity).toLocaleString()} VND
            </Typography>
          </Box>
        ))}

        {/* Total */}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="body1" fontWeight="bold">
            Tổng cộng:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {subtotal.toLocaleString()} VND
          </Typography>
        </Box>

        {/* Signature */}
        <Box display="flex" justifyContent="space-between" mt={4} mb={2}>
          <Box width="48%" textAlign="center">
            <Typography variant="body2">Khách hàng</Typography>
            <Box
              sx={{
                borderBottom: '1px solid #ccc',
                height: 60,
                mt: 4,
                mb: 1,
              }}
            />
          </Box>
          <Box width="48%" textAlign="center">
            <Typography variant="body2">Nhân viên</Typography>
            <Box
              sx={{
                borderBottom: '1px solid #ccc',
                height: 60,
                mt: 4,
                mb: 1,
              }}
            />
          </Box>
        </Box>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="text.secondary">
            (Ký và ghi rõ họ tên)
          </Typography>
        </Box>

        {/* Footer */}
        <Typography variant="body2" textAlign="center" mt={2}>
          Cảm ơn quý khách đã sử dụng dịch vụ của Bệnh Viện Đồng Hồ JSC! <br />
          Vui lòng giữ biên nhận này để đối chiếu khi nhận hàng.
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained"
          startIcon={<PrintIcon />}
        >
          In biên nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReceiptDialog
