import React, { useState } from 'react'

import {
  Close as CloseIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [discountType, setDiscountType] = useState('vnd')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleDiscountTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: string,
  ) => {
    if (newType !== null) {
      setDiscountType(newType)
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }} role="presentation">
        {/* Header */}
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="h6" className="font-semibold">
            Thiết lập
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Hiển thị" sx={{ textTransform: 'none' }} />
          <Tab label="Khác" sx={{ textTransform: 'none' }} />
        </Tabs>
        <Divider />

        {/* Tab Content */}
        <Box className="pt-4">
          {tabIndex === 0 && (
            <Box className="flex flex-col">
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Ảnh hàng hóa</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Mã hàng</Typography>
                <Switch defaultChecked />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Giá bán</Typography>
                <Switch defaultChecked />
              </Box>

              <Box className="flex justify-between items-center w-full py-[10px]">
                <Box className="flex items-center">
                  <Typography variant="body1">Giảm giá</Typography>
                  <InfoIcon
                    className="ml-1 text-gray-400"
                    sx={{ fontSize: 16 }}
                  />
                </Box>
                <ToggleButtonGroup
                  value={discountType}
                  exclusive
                  onChange={handleDiscountTypeChange}
                  size="small"
                >
                  <ToggleButton value="vnd" sx={{ textTransform: 'none' }}>
                    VND
                  </ToggleButton>
                  <ToggleButton value="percent" sx={{ textTransform: 'none' }}>
                    %
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Chỉnh sửa thành tiền</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Xem giá bán gần nhất</Typography>
                <Switch defaultChecked />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Thêm dòng</Typography>
                <Switch defaultChecked />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">
                  Chế độ chọn nhiều hàng hóa
                </Typography>
                <Switch />
              </Box>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box className="flex flex-col">
              <Box className="py-[10px]">
                <Typography variant="body1">
                  Phương thức thanh toán mặc định
                </Typography>
                <RadioGroup row defaultValue="chuyenkhoan">
                  <FormControlLabel
                    value="tienmat"
                    control={<Radio />}
                    label="Tiền mặt"
                  />
                  <FormControlLabel
                    value="chuyenkhoan"
                    control={<Radio />}
                    label="Chuyển khoản"
                  />
                  <FormControlLabel
                    value="the"
                    control={<Radio />}
                    label="Thẻ"
                  />
                  <FormControlLabel value="vi" control={<Radio />} label="Ví" />
                </RadioGroup>
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1" className="pr-4">
                  Tự động hoàn thành đơn hàng khi quét QR thành công
                </Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">
                  Đọc số tiền khách thanh toán qua loa thiết bị
                </Typography>
                <Switch defaultChecked />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">
                  Quét mã để thêm hàng hóa nhanh
                </Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Tồn kho</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Thành phần combo</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Ghi chú hàng hóa</Typography>
                <Switch defaultChecked />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Gộp hàng hóa liên quan</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">
                  Mặc định khách thanh toán
                </Typography>
                <Switch defaultChecked />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Thiết lập giá</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Cây hiển thị giá</Typography>
                <Switch />
              </Box>
              <Box className="flex justify-between items-center py-[10px]">
                <Typography variant="body1">Kéo thả hàng hóa</Typography>
                <Switch />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default SettingsDrawer
