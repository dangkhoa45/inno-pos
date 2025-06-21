import dayjs, { type Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { useOrders } from '@/stores/OrdersContext'

interface OrderProcessingDialogProps {
  open: boolean
  onClose: () => void
}

export function OrderProcessingDialog({
  open,
  onClose,
}: OrderProcessingDialogProps) {
  const { orders } = useOrders()
  const [orderIdSearch, setOrderIdSearch] = useState('')
  const [customerNameSearch, setCustomerNameSearch] = useState('')
  const [productNameSearch, setProductNameSearch] = useState('')
  const [notesSearch, setNotesSearch] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (
        startDate &&
        dayjs(order.timestamp).isBefore(startDate.startOf('day'))
      ) {
        return false
      }
      if (endDate && dayjs(order.timestamp).isAfter(endDate.endOf('day'))) {
        return false
      }

      if (
        orderIdSearch.trim() &&
        !order.orderId
          ?.toLowerCase()
          .includes(orderIdSearch.trim().toLowerCase())
      ) {
        return false
      }

      if (
        customerNameSearch.trim() &&
        !order.customer?.name
          .toLowerCase()
          .includes(customerNameSearch.trim().toLowerCase())
      ) {
        return false
      }

      if (
        productNameSearch.trim() &&
        !order.cartItems.some((item) =>
          item.product.name
            .toLowerCase()
            .includes(productNameSearch.trim().toLowerCase()),
        )
      ) {
        return false
      }

      if (
        notesSearch.trim() &&
        !order.notes?.toLowerCase().includes(notesSearch.trim().toLowerCase())
      ) {
        return false
      }

      return true
    })
  }, [
    orders,
    startDate,
    endDate,
    orderIdSearch,
    customerNameSearch,
    productNameSearch,
    notesSearch,
  ])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Order Processing</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} sx={{ height: '75vh', overflow: 'hidden' }}>
         
          <Box flex="0 0 300px">
            <Paper sx={{mt:0.5, mx: 0.5, p: 2, borderRadius: 2}} elevation={3}>
              <Typography variant="h6" gutterBottom>
                Tìm kiếm
              </Typography>
              <TextField
                fullWidth
                label="Mã đơn hàng"
                value={orderIdSearch}
                onChange={(e) => setOrderIdSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tên khách hàng"
                value={customerNameSearch}
                onChange={(e) => setCustomerNameSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tên sản phẩm"
                value={productNameSearch}
                onChange={(e) => setProductNameSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Ghi chú"
                value={notesSearch}
                onChange={(e) => setNotesSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Paper>
            <Paper sx={{mt: 2, mx: 0.5, p: 2, borderRadius: 2}} elevation={3}>
              <Typography variant="h6" gutterBottom>
                Time
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={startDate}
                  onChange={setStartDate}
                  sx={{ width: '100%', mb: 2 }}
                />
                <DatePicker
                  label="To Date"
                  value={endDate}
                  onChange={setEndDate}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Paper>
          </Box>

         
          <Box flex="1 1 auto" sx={{ display: 'flex', flexDirection: 'column', m: 0.5 }}>
            <TableContainer component={Paper} sx={{ flexGrow: 1 }} variant="outlined" elevation={3}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow
                    sx={{
                      '& .MuiTableCell-root': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    <TableCell>Order ID</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>
                          {order.timestamp
                            ? dayjs(order.timestamp).format('DD/MM/YYYY HH:mm')
                            : 'N/A'}
                        </TableCell>
                        <TableCell>{order.customer?.name || 'N/A'}</TableCell>
                        <TableCell align="right">
                          {order.totalAmount.toLocaleString()} VND
                        </TableCell>
                        <TableCell>Completed</TableCell>
                        <TableCell>{order.notes || '---'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Box p={4}>
                          <Typography>No matching results found</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
} 