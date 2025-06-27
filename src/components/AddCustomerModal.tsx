import { CalendarToday, Close } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface AddCustomerModalProps {
  open: boolean
  onClose: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  maxWidth: '95vw',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  outline: 'none',
  padding: '20px',
}

const AddCustomerModal = ({ open, onClose }: AddCustomerModalProps) => {
  // Force re-render with timestamp
  console.log('AddCustomerModal rendered at:', new Date().toISOString())

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Typography component="h2" sx={{ fontSize: '1rem', fontWeight: 600 }}>
            Thêm khách hàng
            <span className="text-gray-500 font-normal text-sm ml-2">
              | Chi nhánh tạo: Chi nhánh trung tâm
            </span>
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
            <Close />
          </IconButton>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <Grid container spacing={6}>
            {/* Column 1: Avatar */}
            <Grid
              gridColumn="span 2"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 3,
              }}
            >
              <Avatar
                sx={{ width: 80, height: 80, backgroundColor: '#f5f5f5' }}
              >
                <PersonIcon sx={{ fontSize: 40, color: '#9e9e9e' }} />
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' },
                }}
              >
                Chọn ảnh
                <input type="file" hidden />
              </Button>
            </Grid>

            {/* Column 2: Middle Fields */}
            <Grid gridColumn="span 5">
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Mã khách hàng
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Mã mặc định
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Tên khách hàng
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Điện thoại
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Địa chỉ
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    placeholder="Số nhà, tòa nhà, ngõ, đường"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Khu vực
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    placeholder="Chọn Tỉnh/TP - Quận/Huyện"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Phường xã
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    placeholder="Chọn Phường/Xã"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Ngày sinh
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <div className="flex justify-between items-center w-full">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ flexGrow: 1 }}
                        slotProps={{
                          textField: {
                            variant: 'standard',
                            sx: {
                              '.MuiInputBase-input': { fontSize: '0.875rem' },
                            },
                          },
                          openPickerButton: {
                            children: <CalendarToday fontSize="small" />,
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <RadioGroup row name="gender">
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.875rem' }}
                          >
                            Nam
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.875rem' }}
                          >
                            Nữ
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {/* Column 3: Right Fields */}
            <Grid gridColumn="span 5">
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Loại khách
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <RadioGroup row defaultValue="individual">
                    <FormControlLabel
                      value="individual"
                      control={<Radio size="small" />}
                      label={
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem' }}
                        >
                          Cá nhân
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio size="small" />}
                      label={
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem' }}
                        >
                          Công ty
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Mã số thuế
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Số CMND/CCCD
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Facebook
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                sx={{ mb: 2.5, minHeight: '40px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333' }}
                  >
                    Nhóm
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-start"
                sx={{ mb: 2.5, minHeight: '60px' }}
              >
                <Grid gridColumn="span 4" sx={{ textAlign: 'right', pr: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: '#333', pt: 0.5 }}
                  >
                    Ghi chú
                  </Typography>
                </Grid>
                <Grid gridColumn="span 8">
                  <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ '.MuiInput-input': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {/* Footer */}
        <div className="flex justify-end px-8 py-4">
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ textTransform: 'none', px: 4, py: 1 }}
          >
            Lưu
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default AddCustomerModal
