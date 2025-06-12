import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Payment() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Màn hình thanh toán
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Đây là màn hình thanh toán sau khi checkout thành công.
      </Typography>
    </Box>
  )
}
