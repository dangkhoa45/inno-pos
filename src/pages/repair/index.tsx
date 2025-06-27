import * as React from 'react'

import {
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  DirectionsWalk as DirectionsWalkIcon,
  EditOutlined as EditOutlinedIcon,
  FlashOn as FlashOnIcon,
  History as HistoryIcon,
  Inventory2Outlined as Inventory2OutlinedIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
  LocalShippingOutlined as LocalShippingOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  Menu as MenuIcon,
  PrintOutlined as PrintOutlinedIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Redo as RedoIcon,
  Search as SearchIcon,
  SyncAlt as SyncAltIcon,
  Undo as UndoIcon,
} from '@mui/icons-material'
import {
  Backdrop,
  Box,
  Button,
  Divider,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material'

// import { useNavigate } from '@tanstack/react-router'

import AddCustomerModal from '../../components/AddCustomerModal'

const SvgBlueDot = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '8px' }}
  >
    <circle cx="12" cy="12" r="3.5" fill="#007BFF" />
    <path
      d="M12 5V8.5"
      stroke="#007BFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1 3"
    />
    <path
      d="M12 15.5V19"
      stroke="#007BFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="1 3"
    />
  </svg>
)

const RepairPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isCustomerModalOpen, setCustomerModalOpen] = React.useState(false)
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const open = Boolean(anchorEl)
  //   const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddSuaChua = () => {
    // navigate({ to: '/repair-add' })
    handleClose()
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
        {/* Search Bar */}
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

        {/* Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'white',
              color: 'black',
              p: '8px 12px',
              borderRadius: '4px 4px 0 0',
              border: '1px solid #dee2e6',
              borderBottom: 'none',
            }}
          >
            <SyncAltIcon
              sx={{
                color: '#007bff',
                mr: 1,
                transform: 'rotate(90deg)',
                fontSize: '1.2rem',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                mr: 1,
                fontSize: '0.9rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              Hóa đơn 1
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
            aria-controls={open ? 'add-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
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
            MenuListProps={{
              'aria-labelledby': 'add-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                mt: 1.5,
                borderRadius: '8px',
                '& .MuiMenuItem-root': {
                  py: 1.2,
                  px: 2.5,
                  fontSize: '0.9rem',
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>Thêm mới đặt hàng</MenuItem>
            <MenuItem onClick={handleAddSuaChua}>Thêm mới sửa chữa</MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <LocalMallOutlinedIcon />
          <UndoIcon />
          <RedoIcon />
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
          p: '12px',
          pt: '16px',
          gap: '16px',
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Paper
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
            }}
          >
            <Box
              sx={{
                width: '200px',
                height: '5px',
                backgroundColor: 'rgba(0,0,0,0.08)',
                borderRadius: '50%',
                filter: 'blur(5px)',
              }}
            />
          </Paper>
          <Paper
            sx={{
              p: '16px 20px',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <EditOutlinedIcon
                sx={{ color: 'text.secondary', mr: 1.5, fontSize: '1.1rem' }}
              />
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                Ghi chú
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1.5, my: '-4px' }}
              />
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography sx={{ fontSize: '0.9rem' }}>
                Tổng tiền hàng
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                0
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
                borderBottom: '1px dashed #ccc',
                pb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: '0.9rem' }}>Giảm giá</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                0
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                Khách cần trả
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#007bff',
                  fontSize: '1.1rem',
                }}
              >
                0
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Right Sidebar */}
        <Paper
          sx={{
            flex: 1.5,
            minWidth: '420px',
            p: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Van Anh</Typography>
              <DirectionsWalkIcon
                sx={{ fontSize: '1.2rem', color: 'text.secondary' }}
              />
              <ArrowDropDownIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
            >
              26/05/2025 15:11
            </Typography>
          </Box>
          <TextField
            variant="standard"
            placeholder="Tìm khách hàng (F4)"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ fontSize: '1.2rem', color: 'text.secondary' }}
                  />
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
          <TextField
            variant="standard"
            defaultValue="+84366517748"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgBlueDot />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowDropDownIcon sx={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
              sx: { fontSize: '0.95rem', fontWeight: 500, color: '#007bff' },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="standard"
              placeholder="Tên người nhận"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon
                      sx={{ color: '#28a745', fontSize: '1.2rem' }}
                    />
                  </InputAdornment>
                ),
                sx: { fontSize: '0.9rem' },
              }}
            />
            <TextField
              variant="standard"
              placeholder="Số điện thoại"
              fullWidth
              sx={{ '& .MuiInput-input': { fontSize: '0.9rem' } }}
            />
          </Box>
          <TextField
            variant="standard"
            placeholder="Địa chỉ chi tiết (Số nhà, ngõ, đường)"
            fullWidth
            sx={{ '& .MuiInput-input': { fontSize: '0.9rem' } }}
          />
          <TextField
            variant="standard"
            placeholder="Tỉnh/TP - Quận/Huyện"
            fullWidth
            sx={{ '& .MuiInput-input': { fontSize: '0.9rem' } }}
          />
          <TextField
            variant="standard"
            placeholder="Phường/Xã"
            fullWidth
            sx={{ '& .MuiInput-input': { fontSize: '0.9rem' } }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Inventory2OutlinedIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <TextField
              variant="standard"
              defaultValue="500"
              sx={{
                width: '50px',
                '& .MuiInput-input': { textAlign: 'right', fontSize: '0.9rem' },
              }}
            />
            <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
              gram
            </Typography>
            <ArrowDropDownIcon
              sx={{ cursor: 'pointer', color: 'text.secondary' }}
            />
            <TextField
              variant="standard"
              defaultValue="10"
              sx={{
                width: '30px',
                mx: 0.5,
                '& .MuiInput-input': {
                  textAlign: 'center',
                  fontSize: '0.9rem',
                },
              }}
            />{' '}
            x
            <TextField
              variant="standard"
              defaultValue="10"
              sx={{
                width: '30px',
                mx: 0.5,
                '& .MuiInput-input': {
                  textAlign: 'center',
                  fontSize: '0.9rem',
                },
              }}
            />{' '}
            x
            <TextField
              variant="standard"
              defaultValue="10"
              sx={{
                width: '30px',
                mx: 0.5,
                '& .MuiInput-input': {
                  textAlign: 'center',
                  fontSize: '0.9rem',
                },
              }}
            />
            <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
              cm
            </Typography>
            <ArrowDropDownIcon
              sx={{ cursor: 'pointer', color: 'text.secondary' }}
            />
          </Box>

          <TextField
            variant="standard"
            placeholder="Ghi chú cho bưu tá"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditOutlinedIcon
                    sx={{ fontSize: '1.2rem', color: 'text.secondary' }}
                  />
                </InputAdornment>
              ),
              sx: { fontSize: '0.9rem' },
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: '#f8f9fa',
              p: '8px 12px',
              borderRadius: '4px',
            }}
          >
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Thu hộ tiền (COD)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Switch defaultChecked />
              <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                0
              </Typography>
            </Box>
          </Box>

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
          position: 'sticky',
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

export default RepairPage
