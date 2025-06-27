import React, { useState } from 'react'

import { Close, CalendarMonth, AccessTime, Person } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  Popover,
  Checkbox,
} from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface ReceiptModalProps {
  open: boolean
  onClose: () => void
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ open, onClose }) => {
  const [customer, setCustomer] = useState<string>('Nguyễn Tuấn Minh')
  const [phone] = useState<string>('0987654321') // Assuming phone is read-only based on UI
  const [debt] = useState<string>('0') // Assuming debt is read-only
  const [collectAmount, setCollectAmount] = useState<string>('0')
  const [debtAfter] = useState<string>('0') // Assuming this is calculated or static
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs('2025-06-04T14:44:00'))
  const [notes, setNotes] = useState<string>('')

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleCalendarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCalendarClose = () => {
    setAnchorEl(null)
  }

  const openCalendar = Boolean(anchorEl)
  const calendarId = openCalendar ? 'date-popover' : undefined

  const formatCurrency = (amount: string) => {
    const num = Number(amount.replace(/[^0-9]/g, ''))
    if (isNaN(num)) return '0'
    return new Intl.NumberFormat('vi-VN').format(num)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: 'calc(100% - 64px)',
            maxWidth: '900px',
            height: 'calc(100% - 64px)',
            maxHeight: '700px',
            borderRadius: '4px',
            backgroundColor: '#f0f2f5',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderBottom: '1px solid #dee2e6',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500 }}>
              Lập phiếu thu
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          {/* Body */}
          <DialogContent
            sx={{
              p: 2,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              backgroundColor: '#f0f2f5',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#fff',
                p: 2,
                borderRadius: '4px',
                border: '1px solid #dee2e6',
              }}
            >
              <Box
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}
              >
                {/* Left Column */}
                <Box>
                  <TextField
                    fullWidth
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            size="small"
                            edge="start"
                            sx={{ color: '#1976d2', p: 0 }}
                          >
                            <Person />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            edge="end"
                            onClick={() => setCustomer('')}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#1976d2',
                      },
                      '& .MuiInputBase-root': { paddingTop: '4px' },
                      '& .MuiInputBase-input': {
                        fontSize: '14px',
                        paddingLeft: '8px',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      mt: 3,
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#6c757d',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Thu từ khách:
                    </Typography>
                    <TextField
                      variant="standard"
                      value={
                        collectAmount === '0'
                          ? ''
                          : formatCurrency(collectAmount)
                      }
                      placeholder="0"
                      onChange={(e) =>
                        setCollectAmount(e.target.value.replace(/[^0-9]/g, ''))
                      }
                      sx={{
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#1976d2',
                        },
                        '& .MuiInput-input': {
                          textAlign: 'right',
                          fontSize: '14px',
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#6c757d',
                      mt: 0.5,
                      ml: '105px',
                    }}
                  >
                    Tiền mặt
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: '#6c757d',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Nợ sau:
                    </Typography>
                    <TextField
                      variant="standard"
                      disabled
                      value={formatCurrency(debtAfter)}
                      sx={{
                        '& .MuiInput-input': {
                          textAlign: 'right',
                          fontSize: '14px',
                          color: '#343a40',
                        },
                        '& .Mui-disabled:before': {
                          borderBottomStyle: 'solid',
                          borderBottomColor: '#dee2e6',
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Right Column */}
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      height: '40px',
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', color: '#6c757d' }}>
                      Số điện thoại: {phone}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#6c757d' }}>
                      Nợ:{' '}
                      <span style={{ fontWeight: 500, color: '#343a40' }}>
                        {formatCurrency(debt)}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3, display: 'flex', alignItems: 'flex-end' }}>
                    <Typography
                      sx={{ fontSize: '14px', color: '#6c757d', mr: 2 }}
                    >
                      Thời gian:
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #dee2e6',
                        py: '1px',
                      }}
                    >
                      <Typography sx={{ fontSize: '14px', color: '#343a40' }}>
                        {dateTime.format('DD/MM/YYYY HH:mm')}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{ ml: 1, p: '2px' }}
                        onClick={handleCalendarClick}
                      >
                        <CalendarMonth fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ p: '2px' }}>
                        <AccessTime fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    label="Ghi chú"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    variant="standard"
                    sx={{
                      mt: 1.5,
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#1976d2',
                      },
                      '& .MuiInputLabel-root': { fontSize: '14px' },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Table */}
            <Box
              sx={{
                flex: 1,
                mt: 2,
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  display: 'flex',
                  px: 2,
                  py: 1,
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                }}
              >
                <Typography
                  sx={{ flexBasis: '25%', fontSize: '14px', fontWeight: 500 }}
                >
                  Mã hóa đơn
                </Typography>
                <Typography
                  sx={{ flexBasis: '25%', fontSize: '14px', fontWeight: 500 }}
                >
                  Thời gian
                </Typography>
                <Typography
                  sx={{
                    flexBasis: '20%',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'right',
                  }}
                >
                  Giá trị hóa đơn
                </Typography>
                <Typography
                  sx={{
                    flexBasis: '15%',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'right',
                  }}
                >
                  Đã thu
                </Typography>
                <Typography
                  sx={{
                    flexBasis: '15%',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'right',
                  }}
                >
                  Thu
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/demoweb-2d876.appspot.com/o/images%2Fempty-box.png?alt=media&token=a8323c31-54d8-46a4-8356-829a28e36502"
                  alt="empty"
                  style={{ width: '60px', height: '60px', opacity: 0.6 }}
                />
                <Typography sx={{ mt: 2, fontSize: '14px', color: '#6c757d' }}>
                  Không tìm thấy kết quả nào phù hợp
                </Typography>
              </Box>
            </Box>
            <Popover
              id={calendarId}
              open={openCalendar}
              anchorEl={anchorEl}
              onClose={handleCalendarClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={dateTime}
                onChange={(newValue) => {
                  if (newValue) setDateTime(newValue)
                  handleCalendarClose()
                }}
                slotProps={{
                  toolbar: { hidden: true },
                  actionBar: {
                    actions: ['today'],
                  },
                }}
              />
            </Popover>
          </DialogContent>

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderTop: '1px solid #dee2e6',
              backgroundColor: '#fff',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '13px' }}>
                Trừ vào công nợ <Checkbox size="small" />
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{ textTransform: 'none', fontSize: '14px' }}
              >
                Bỏ qua
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                Tạo phiếu thu
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                Tạo phiếu thu & In
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </LocalizationProvider>
  )
}

export default ReceiptModal
