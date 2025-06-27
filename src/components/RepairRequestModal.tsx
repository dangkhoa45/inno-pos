import React, { useState } from 'react'

import { Close, Search, CalendarMonth } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Box,
  Tab,
  Tabs,
} from '@mui/material'

interface RepairRequestModalProps {
  open: boolean
  onClose: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`repair-tabpanel-${index}`}
      aria-labelledby={`repair-tab-${index}`}
      className="flex-1 overflow-y-auto"
      {...other}
    >
      {value === index && <Box sx={{ p: 2, height: '100%' }}>{children}</Box>}
    </div>
  )
}

const RepairRequestModal: React.FC<RepairRequestModalProps> = ({
  open,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [filters, setFilters] = useState({
    requestCode: '',
    customerInfo: '',
    serialNumber: '',
    productInfo: '',
    fromDate: '',
    toDate: '',
  })

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleFilterChange =
    (field: keyof typeof filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const tabs = [
    'Yêu cầu sửa chữa',
    'Hàng sửa chữa',
    'Hẹn trả khách',
    'Trạng thái sửa chữa',
  ]

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '90vw',
          height: '85vh',
          maxWidth: '1200px',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogContent
        sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderBottom: '1px solid #e0e4eb',
            backgroundColor: '#fff',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#333',
              margin: 0,
            }}
          >
            Xử lý yêu cầu sửa chữa
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: '#666',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: '280px',
              backgroundColor: '#f8f9fb',
              borderRight: '1px solid #e0e4eb',
              p: 2,
              overflowY: 'auto',
            }}
          >
            {/* Tìm kiếm Section */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#333',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Search sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                Tìm kiếm
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  placeholder="Theo mã yêu cầu"
                  value={filters.requestCode}
                  onChange={handleFilterChange('requestCode')}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#e0e4eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />

                <TextField
                  placeholder="Theo mã, tên, SDT KH"
                  value={filters.customerInfo}
                  onChange={handleFilterChange('customerInfo')}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#e0e4eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />

                <TextField
                  placeholder="Theo Serial/IMEI/Biến số"
                  value={filters.serialNumber}
                  onChange={handleFilterChange('serialNumber')}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#e0e4eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />

                <TextField
                  placeholder="Theo tên, mã hàng"
                  value={filters.productInfo}
                  onChange={handleFilterChange('productInfo')}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#e0e4eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Thời gian Section */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#333',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CalendarMonth sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                Thời gian
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  type="date"
                  label="Từ ngày"
                  value={filters.fromDate}
                  onChange={handleFilterChange('fromDate')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#e0e4eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '13px',
                    },
                  }}
                />

                <TextField
                  type="date"
                  label="Đến ngày"
                  value={filters.toDate}
                  onChange={handleFilterChange('toDate')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#e0e4eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1e88e5',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '13px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Tabs Navigation */}
            <Box
              sx={{
                borderBottom: '1px solid #e0e4eb',
                backgroundColor: '#fff',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    fontSize: '13px',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: '#666',
                    minHeight: '48px',
                    '&.Mui-selected': {
                      color: '#1e88e5',
                      backgroundColor: 'rgba(30, 136, 229, 0.08)',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#1e88e5',
                    height: '3px',
                  },
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab} />
                ))}
              </Tabs>
            </Box>

            {/* Tab Panels */}
            {tabs.map((_, index) => (
              <TabPanel key={index} value={activeTab} index={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#999',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#f5f7f9',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    <Search sx={{ fontSize: 40, color: '#ccc' }} />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      color: '#999',
                      textAlign: 'center',
                    }}
                  >
                    Không tìm thấy kết quả nào phù hợp
                  </Typography>
                </Box>
              </TabPanel>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default RepairRequestModal
