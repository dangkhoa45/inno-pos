import React, { useEffect, useState } from 'react'

import { CalendarToday, Close } from '@mui/icons-material'
import PhotoCameraOutlined from '@mui/icons-material/PhotoCameraOutlined'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface DialogFormCustomerProps {
  open: boolean
  onClose: () => void
}

const DialogFormCustomer = ({ open, onClose }: DialogFormCustomerProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {}, [open])

  const handleClose = () => {
    onClose()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '1200px',
          px: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography
          component="div"
          sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'primary.main' }}
        >
          Thêm khách hàng mới
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
        <Grid container spacing={6}>
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              pt: 2,
            }}
          >
            <Box
              sx={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                backgroundColor: '#dbdbdb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 4,
                  backgroundColor: '#d0d0d0',
                },
              }}
              onClick={() => {
                document.getElementById('customer-avatar-input')?.click()
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <PhotoCameraOutlined sx={{ fontSize: 72, color: '#888' }} />
              )}
              <input
                id="customer-avatar-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onClick={(e) => e.stopPropagation()}
                onChange={handleAvatarChange}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 10 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Mã khách hàng
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value="Mã mặc định"
                  disabled
                  sx={{
                    fontWeight: 600,
                    background: '#f8f8f8',
                    borderRadius: 2,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Tên khách hàng
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Số điện thoại
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Email
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Địa chỉ
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Số nhà, tòa nhà, ngõ, đường"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Khu vực
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Chọn Tỉnh/TP - Quận/Huyện"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Phường/Xã
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Chọn Phường/Xã"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 500,
                        color: '#666',
                        mb: 0.5,
                        display: 'block',
                      }}
                    >
                      Ngày sinh
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: '100%' }}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { borderRadius: 2 },
                          },
                          openPickerButton: {
                            children: <CalendarToday fontSize="small" />,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 500,
                        color: '#666',
                        mb: 0.5,
                        display: 'block',
                      }}
                    >
                      Giới tính
                    </Typography>
                    <RadioGroup row name="gender">
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.95rem' }}
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
                            sx={{ fontSize: '0.95rem' }}
                          >
                            Nữ
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Loại khách
                </Typography>
                <RadioGroup row defaultValue="individual">
                  <FormControlLabel
                    value="individual"
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                        Cá nhân
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                        Công ty
                      </Typography>
                    }
                  />
                </RadioGroup>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Mã số thuế
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Số CMND/CCCD
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Facebook
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Nhóm
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: '#666',
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Ghi chú
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 0, py: 3 }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              textTransform: 'none',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            Lưu
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogFormCustomer
