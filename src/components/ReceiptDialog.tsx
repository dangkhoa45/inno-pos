import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
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
}) => {
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ px: 3, pb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="flex-start" flexDirection={'column'}>
            <Typography fontWeight="bold">Xem trước biên nhận</Typography>
            <Typography variant="caption" color="text.secondary">
              Xem trước biên nhận trước khi in
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          border: 1,
          borderColor: '#ccc',
          m: 3,
          mt: 0,
          mb: 1.3,
          borderRadius: 1,
          bgcolor: 'grey.50',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          flexGrow={1}
          gap={1}
          my={1.5}
          width={'100%'}
        >
          <Typography fontWeight="bold">Xem trước</Typography>
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DriveFileRenameOutlineIcon />}
              color="secondary"
              sx={{ bgcolor: 'white' }}
            >
              Chữ ký khách hàng
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DriveFileRenameOutlineIcon />}
              color="secondary"
              sx={{ bgcolor: 'white' }}
            >
              Chữ ký nhân viên
            </Button>
            <IconButton
              onClick={handlePrint}
              color="secondary"
              size="small"
              sx={{ bgcolor: 'white' }}
            >
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: '#ccc',
            borderRadius: 2,
            p: 2,
            m: -0.5,
            mb: 0.1,
            background: 'white',
          }}
        >
          <Box textAlign="center" mb={2}>
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

          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ my: 2 }}
          >
            BIÊN NHẬN
          </Typography>

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

          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="body1" fontWeight="bold">
              Tổng cộng:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {subtotal.toLocaleString()} VND
            </Typography>
          </Box>

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

          <Typography variant="body2" textAlign="center" mt={2}>
            Cảm ơn quý khách đã sử dụng dịch vụ của Bệnh Viện Đồng Hồ JSC!{' '}
            <br />
            Vui lòng giữ biên nhận này để đối chiếu khi nhận hàng.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ bgcolor: 'white' }}
        >
          Hủy
        </Button>
        <Button onClick={() => {}} variant="contained" color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReceiptDialog
