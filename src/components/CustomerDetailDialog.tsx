import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import type { Customer } from '../mockup'

interface CustomerDetailDialogProps {
  open: boolean
  customer: Customer | null
  onClose: () => void
  onBack?: () => void
}

// Giả lập dữ liệu đơn hàng gần đây
const mockOrders = [
  {
    id: 'HD11111',
    date: '06/06/2025 15:54',
    staff: 'Trần Đình Anh Khoa',
    total: 12000000,
  },
  {
    id: 'HD11111',
    date: '06/06/2025 15:54',
    staff: 'Trần Đình Anh Khoa',
    total: 12000000,
  },
  {
    id: 'HD11111',
    date: '06/06/2025 15:54',
    staff: 'Trần Đình Anh Khoa',
    total: 12000000,
  },
  {
    id: 'HD11111',
    date: '06/06/2025 15:54',
    staff: 'Trần Đình Anh Khoa',
    total: 12000000,
  },
  {
    id: 'HD11111',
    date: '06/06/2025 15:54',
    staff: 'Trần Đình Anh Khoa',
    total: 12000000,
  },
]

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({
  open,
  customer,
  onClose,
  onBack,
}) => {
  if (!customer) return null
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 700,
          color: 'primary.main',
          fontSize: 22,
          p: 2,
        }}
      >
        {onBack && (
          <Button onClick={onBack} sx={{ minWidth: 0, mr: 2 }}>
            <ArrowBackIcon />
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }}>{`Khách hàng: ${customer.name}`}</Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 16,
            minWidth: 120,
            textAlign: 'right',
          }}
        >
          ID: {customer.phone}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={customer.faceLeft}
              sx={{ width: 110, height: 110, mb: 1 }}
            />
            <Typography>Trái</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={customer.faceCenter || customer.avatar}
              sx={{ width: 110, height: 110, mb: 1 }}
            />
            <Typography>Giữa</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={customer.faceRight}
              sx={{ width: 110, height: 110, mb: 1 }}
            />
            <Typography>Phải</Typography>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Đơn hàng gần đây
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Mã hóa đơn</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Nhân viên</TableCell>
              <TableCell align="right">Tổng cộng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.staff}</TableCell>
                <TableCell align="right">
                  {order.total.toLocaleString()} VND
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 2,
              minWidth: 120,
            }}
          >
            Chọn khách hàng này
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDetailDialog
