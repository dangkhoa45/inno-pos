import React, { useState } from 'react'

import {
  CalendarMonth as CalendarIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

interface ReturnModalProps {
  open: boolean
  onClose: () => void
}

const invoices = [
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
  {
    id: 'HD111111',
    time: '06/06/2025 16:54',
    employee: 'Trần Đình Anh Khóa',
    customer: 'Phạm Thanh Liêm',
    total: '12,000,000',
  },
]

const ReturnModal: React.FC<ReturnModalProps> = ({ open, onClose }) => {
  const [selectedRow] = useState<number | null>(1) // Nếu cần giữ selectedRow
  const navigate = useNavigate()

  const handleRowClick = (invoiceId: string) => {
    navigate({ to: '/trahang', search: { invoiceId } })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: { xs: '95vh', md: '90vh' },
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
          color: (theme) => theme.palette.grey[500],
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{ p: { xs: 1.5, md: 3 }, display: 'flex', flexDirection: 'column' }}
      >
        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search by code, serial..."
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: '8px', backgroundColor: 'white' },
            }}
            sx={{ width: { xs: '100%', md: '350px' } }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, md: 2 },
              }}
            >
              <DatePicker
                label="From"
                defaultValue={dayjs('2025-06-01')}
                slots={{
                  openPickerIcon: CalendarIcon,
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    InputProps: {
                      sx: { borderRadius: '8px', backgroundColor: 'white' },
                    },
                  },
                }}
              />
              <DatePicker
                label="To"
                defaultValue={dayjs('2025-11-09')}
                slots={{
                  openPickerIcon: CalendarIcon,
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    InputProps: {
                      sx: { borderRadius: '8px', backgroundColor: 'white' },
                    },
                  },
                }}
              />
            </Box>
          </LocalizationProvider>
        </Box>

        {/* Table */}
        <Paper
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <TableContainer sx={{ flex: 1 }}>
            <Table stickyHeader aria-label="invoices table">
              <TableHead>
                <TableRow
                  sx={{
                    '& .MuiTableCell-root': {
                      backgroundColor: '#6b7280',
                      color: 'white',
                      fontWeight: '600',
                      py: 1.5,
                    },
                  }}
                >
                  <TableCell>Mã hóa đơn</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Nhân viên</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell align="right">Tổng cộng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(invoice.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f3f4f6' },
                      ...(selectedRow === index && {
                        backgroundColor: '#e0f2fe',
                      }),
                      '& .MuiTableCell-root': { border: 0 },
                    }}
                  >
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.time}</TableCell>
                    <TableCell>{invoice.employee}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: '500' }}>
                      {invoice.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 2,
            px: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            9/40 invoices
          </Typography>
          <Pagination
            count={5}
            page={1}
            siblingCount={0}
            boundaryCount={1}
            color="primary"
            size="small"
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ReturnModal
