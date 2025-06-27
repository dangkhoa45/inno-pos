import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface RepairServiceFormProps {
  onDelete: () => void
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="body2"
    sx={{ fontWeight: 'bold', fontSize: '0.875rem', minWidth: '140px' }}
  >
    {children}
  </Typography>
)

const RepairServiceForm = ({ onDelete }: RepairServiceFormProps) => {
  return (
    <Paper
      sx={{
        p: '24px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative',
        width: '97%',
        bgcolor: 'white',
        minHeight: 'auto',
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'visible',
      }}
    >
      <IconButton
        aria-label="delete"
        onClick={onDelete}
        sx={{ position: 'absolute', top: 12, right: 12 }}
      >
        <DeleteOutlineIcon />
      </IconButton>

      {/* Top form */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Dòng 1: Tên đồng hồ */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Label>Tên đồng hồ:</Label>
          <Typography sx={{ fontWeight: 'bold' }}>Đồng hồ Casio</Typography>
        </Box>

        {/* Dòng 2: Serial, Hẹn trả khách, Trạng thái */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Serial/IMEI/Biển số</Label>
            <TextField variant="standard" fullWidth size="small" />
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Hẹn trả khách</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%' }}
                slotProps={{
                  textField: { variant: 'standard', size: 'small' },
                  openPickerButton: {
                    children: <CalendarTodayIcon fontSize="small" />,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Trạng thái</Label>
            <FormControl variant="standard" fullWidth size="small">
              <Select defaultValue="da-nhan">
                <MenuItem value="da-nhan">Đã nhận</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Dòng 3: Model, Loại yêu cầu, Tổng phí */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Model</Label>
            <TextField
              variant="standard"
              placeholder="Nhập model máy"
              fullWidth
              size="small"
            />
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Loại yêu cầu</Label>
            <FormControl variant="standard" fullWidth size="small">
              <Select defaultValue="sua-chua-dich-vu">
                <MenuItem value="sua-chua-dich-vu">Sửa chữa dịch vụ</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Tổng phí</Label>
            <Typography sx={{ fontWeight: 'bold', pb: 0.5 }}>0</Typography>
          </Box>
        </Box>

        {/* Dòng 4: Số lượng, Kỹ thuật viên */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Số lượng</Label>
            <TextField
              variant="standard"
              fullWidth
              defaultValue="1"
              size="small"
            />
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flex: 1 }}
          >
            <Label>Kỹ thuật viên</Label>
            <FormControl variant="standard" fullWidth size="small">
              <Select defaultValue="">
                <MenuItem value="">-- Chọn --</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}></Box> {/* Empty third column */}
        </Box>
      </Box>

      {/* Ghi chú */}
      <TextField
        fullWidth
        variant="filled"
        placeholder="Ghi chú"
        hiddenLabel
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EditOutlinedIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small">
                <PhotoCameraOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <LockOutlinedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true,
          sx: { borderRadius: '8px' },
        }}
        sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}
      />

      {/* Service section */}
      <Box>
        <Box
          sx={{
            bgcolor: '#3b82f6',
            color: 'white',
            py: 1.5,
            px: 2,
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
            Dịch vụ sửa chữa, hàng hóa thay thế
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              fontSize: '0.9rem',
              color: '#cbe1ff',
            }}
          >
            <Typography
              sx={{ width: '80px', textAlign: 'center', fontSize: 'inherit' }}
            >
              Đơn vị tính
            </Typography>
            <Typography
              sx={{ width: '60px', textAlign: 'center', fontSize: 'inherit' }}
            >
              Số lượng
            </Typography>
            <Typography
              sx={{ width: '80px', textAlign: 'center', fontSize: 'inherit' }}
            >
              Đơn giá
            </Typography>
            <Typography
              sx={{ width: '80px', textAlign: 'center', fontSize: 'inherit' }}
            >
              Thành tiền
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderTop: 0,
            p: 2,
            borderRadius: '0 0 8px 8px',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Chọn dịch vụ sửa chữa, hàng hóa thay thế"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    sx={{ bgcolor: '#eeeeee', borderRadius: 1, p: '2px' }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, '.MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <Typography
            align="center"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            Không có dịch vụ sửa chữa, hàng hóa thay thế
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
export default RepairServiceForm
