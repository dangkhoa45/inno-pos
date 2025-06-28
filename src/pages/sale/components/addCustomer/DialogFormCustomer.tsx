import { useEffect, useState } from 'react'

import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import AvatarUpload from '../../../../components/AvatarUpload'
import FormField from '../../../../components/FormField'

interface DialogFormCustomerProps {
  open: boolean
  onClose: () => void
}

interface CustomerFormData {
  customerCode: string
  lastName: string
  taxCode: string
  idNumber: string
  birthDate: string
  gender: string
  email: string
  phone: string
  customerType: string
  notes: string
  address: string
  region: string
  ward: string
}

const DialogFormCustomer = ({ open, onClose }: DialogFormCustomerProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<CustomerFormData>({
    customerCode: '',
    lastName: '',
    taxCode: '',
    idNumber: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    customerType: 'individual',
    notes: '',
    address: '',
    region: '',
    ward: '',
  })

  useEffect(() => {
    if (open) {
      setFormData({
        customerCode: '',
        lastName: '',
        taxCode: '',
        idNumber: '',
        birthDate: '',
        gender: '',
        email: '',
        phone: '',
        customerType: 'individual',
        notes: '',
        address: '',
        region: '',
        ward: '',
      })
      setAvatarUrl(null)
    }
  }, [open])

  const handleClose = () => {
    onClose()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleFieldChange = (field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving customer data:', { ...formData, avatarUrl })
    handleClose()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid
              size={{ xs: 12, md: 3 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: 480,
              }}
            >
              <AvatarUpload
                avatarUrl={avatarUrl}
                onAvatarChange={handleAvatarChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 9 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormField
                    label="Mã khách hàng"
                    value={formData.customerCode}
                    onChange={(v) => handleFieldChange('customerCode', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Họ"
                    value={formData.lastName}
                    onChange={(v) => handleFieldChange('lastName', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Ngày sinh"
                    type="date"
                    value={formData.birthDate}
                    onChange={(v) => handleFieldChange('birthDate', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Số điện thoại"
                    value={formData.phone}
                    onChange={(v) => handleFieldChange('phone', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Địa chỉ"
                    value={formData.address}
                    onChange={(v) => handleFieldChange('address', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Khu vực"
                    value={formData.region}
                    onChange={(v) => handleFieldChange('region', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Phường/Xã"
                    value={formData.ward}
                    onChange={(v) => handleFieldChange('ward', v)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormField
                    label="Mã số thuế"
                    value={formData.taxCode}
                    onChange={(v) => handleFieldChange('taxCode', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Số CMND/CCCD"
                    value={formData.idNumber}
                    onChange={(v) => handleFieldChange('idNumber', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Giới tính"
                    type="radio"
                    radioOptions={[
                      { value: 'male', label: 'Nam' },
                      { value: 'female', label: 'Nữ' },
                    ]}
                    radioDefaultValue={formData.gender}
                    radioName="gender"
                    onChange={(v) => handleFieldChange('gender', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Email"
                    value={formData.email}
                    onChange={(v) => handleFieldChange('email', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Loại khách"
                    type="radio"
                    radioOptions={[
                      { value: 'individual', label: 'Cá nhân' },
                      { value: 'company', label: 'Công ty' },
                    ]}
                    radioDefaultValue={formData.customerType}
                    radioName="customerType"
                    onChange={(v) => handleFieldChange('customerType', v)}
                  />
                  <Box mt={2} />
                  <FormField
                    label="Ghi chú"
                    value={formData.notes}
                    onChange={(v) => handleFieldChange('notes', v)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', px: 0, py: 3 }}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                px: 4,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Xác nhận
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  )
}

export default DialogFormCustomer
