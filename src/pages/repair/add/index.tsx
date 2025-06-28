import * as React from 'react'

import {
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  EditOutlined as EditOutlinedIcon,
  FlashOn as FlashOnIcon,
  History as HistoryIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
  LocalShippingOutlined as LocalShippingOutlinedIcon,
  Menu as MenuIcon,
  PrintOutlined as PrintOutlinedIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Redo as RedoIcon,
  Search as SearchIcon,
  Undo as UndoIcon,
} from '@mui/icons-material'
import { useNavigate } from '@tanstack/react-router'
import {
  Backdrop,
  Box,
  Button,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

import AddCustomerModal from '../../../components/AddCustomerModal'
import RepairServiceForm from '../../../components/RepairServiceForm'

const AddRepairPage = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isCustomerModalOpen, setCustomerModalOpen] = React.useState(false)
  const [showForm, setShowForm] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  
  const handleNewRepair = () => {
    handleClose()
    navigate({ to: '/repair-add' })
  }

  const handleSave = () => {
    setShowSuccessModal(true)
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false)
    }, 3000)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f0f2f5',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '8px 16px',
          bgcolor: '#007bff',
          color: 'white',
          flexShrink: 0,
          borderRadius: 0,
          gap: 1.5,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'white',
            borderRadius: '4px',
            p: '6px 10px',
            flexBasis: '350px',
          }}
        >
          <SearchIcon
            sx={{ color: 'text.secondary', mr: 1, fontSize: '1.2rem' }}
          />
          <InputBase
            placeholder="Tìm hàng hóa (F3)"
            sx={{ color: 'black', flex: 1, fontSize: '0.9rem' }}
          />
          <QrCodeScannerIcon
            sx={{ color: 'text.secondary', fontSize: '1.2rem' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              p: '8px 12px',
              borderRadius: '4px 4px 0 0',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <Typography
              variant="body2"
              sx={{ mr: 1, fontSize: '0.9rem', fontWeight: 500 }}
            >
              Hóa đơn 1
            </Typography>
            <CloseIcon
              sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'white',
              color: 'black',
              p: '8px 12px',
              borderRadius: '4px 4px 0 0',
              borderBottom: 'none',
            }}
          >
            <Typography
              variant="body2"
              sx={{ mr: 1, fontSize: '0.9rem', fontWeight: 500 }}
            >
              Sửa chữa 1
            </Typography>
            <CloseIcon
              sx={{
                fontSize: '1rem',
                cursor: 'pointer',
                color: 'text.secondary',
              }}
            />
          </Box>
          <Box
            id="add-button"
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: '4px',
              mb: '1px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              ml: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <AddIcon sx={{ fontSize: '1.1rem' }} />
            <ArrowDropDownIcon sx={{ fontSize: '1.2rem' }} />
          </Box>
          <Menu
            id="add-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            <MenuItem onClick={handleClose}>Thêm mới đặt hàng</MenuItem>
            <MenuItem onClick={handleNewRepair}>Thêm mới sửa chữa</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <LocalMallOutlinedIcon /> <UndoIcon /> <RedoIcon />{' '}
          <PrintOutlinedIcon />
          <Typography
            variant="body2"
            sx={{ fontSize: '0.9rem', letterSpacing: '0.5px' }}
          >
            03665******
          </Typography>
          <MenuIcon />
        </Box>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          p: '16px',
          gap: '16px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: showForm ? 'flex-start' : 'center',
            alignItems: 'center',
          }}
        >
          {showForm ? (
            <RepairServiceForm onDelete={() => setShowForm(false)} />
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{
                bgcolor: '#60a5fa',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '1rem',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                border: '3px solid #add5ff',
                '&:hover': { bgcolor: '#3b82f6' },
              }}
            >
              Thêm mới
            </Button>
          )}
        </Box>

        <Paper
          sx={{
            flex: 1.5,
            minWidth: '400px',
            p: '20px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Button
              endIcon={<ArrowDropDownIcon />}
              sx={{
                p: 0,
                textTransform: 'none',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              Van Anh
            </Button>
            <Button
              endIcon={<ArrowDropDownIcon />}
              sx={{
                p: 0,
                textTransform: 'none',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              Tại cửa hàng
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
            >
              26/05/2025 15:19
            </Typography>
          </Box>
          <TextField
            variant="standard"
            placeholder="Tìm khách hàng (F4)"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    onClick={() => setCustomerModalOpen(true)}
                    sx={{
                      cursor: 'pointer',
                      color: 'primary.main',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem',
                    }}
                  />
                </InputAdornment>
              ),
              sx: { fontSize: '0.9rem' },
            }}
          />
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Tổng tiền hàng</Typography>
              <Typography>0</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Giảm giá</Typography>
              <Typography>0</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px dashed #ccc',
                pb: 2,
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Khách cần trả</Typography>
              <Typography sx={{ fontWeight: 'bold', color: '#007bff' }}>
                0
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
            >
              <Typography>Tiền thừa trả khách</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, minHeight: '50px' }} />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            sx={{
              textTransform: 'uppercase',
              py: 1.2,
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: 'none',
            }}
          >
            Lưu
          </Button>
        </Paper>

        <AddCustomerModal
          open={isCustomerModalOpen}
          onClose={() => setCustomerModalOpen(false)}
        />

        {/* Success Modal */}
        <Modal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              bgcolor: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              p: '24px',
              textAlign: 'center',
              outline: 'none',
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: '48px',
                color: '#4CAF50',
                mb: 2,
              }}
            />
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#333',
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              Đơn hàng đã được lưu thành công.
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#007bff',
                fontWeight: 500,
              }}
            >
              Mã đơn hàng: #CUST-2025-05586
            </Typography>
          </Box>
        </Modal>

        {/* Ghi chú đơn hàng - tách biệt với RepairServiceForm */}
        <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
          <Paper
            component={Button}
            sx={{
              textTransform: 'none',
              color: 'text.primary',
              width: '62.8vw',
              textAlign: 'left',
              justifyContent: 'flex-start',
              p: '12px 20px',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              bgcolor: 'white',
              minWidth: '180px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: '#f8f9fa',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            <EditOutlinedIcon
              sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.1rem' }}
            />
            <Typography
              variant="body2"
              sx={{ fontSize: '0.9rem', fontWeight: 500 }}
            >
              Ghi chú đơn hàng
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Footer */}
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
          flexShrink: 0,
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          minHeight: '60px',
          bottom: 0,
          zIndex: 10,
          bgcolor: 'white',
          m: '12px',
          mb: 0,
          px: '24px',
        }}
      >
        <Button
          sx={{
            textTransform: 'none',
            color: 'text.primary',
            fontSize: '0.9rem',
            fontWeight: 500,
            px: 2,
            py: 1,
            minWidth: '100px',
          }}
          startIcon={<FlashOnIcon />}
        >
          Bán nhanh
        </Button>
        <Button
          sx={{
            textTransform: 'none',
            color: 'text.primary',
            fontSize: '0.9rem',
            fontWeight: 500,
            px: 2,
            py: 1,
            minWidth: '100px',
          }}
          startIcon={<HistoryIcon />}
        >
          Bán thường
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            boxShadow: 'none',
            px: 3,
            py: 1,
            minWidth: '120px',
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
          }}
          startIcon={<LocalShippingOutlinedIcon />}
        >
          Bán giao hàng
        </Button>
      </Paper>
    </Box>
  )
}

export default AddRepairPage
