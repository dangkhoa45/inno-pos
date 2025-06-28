import React from 'react'

import { Grid } from '@mui/material'

import FormField from '../../../../components/FormField'

interface CustomerAddressInfoProps {
  formData: {
    address: string
    region: string
    ward: string
  }
  onFieldChange: (field: string, value: string) => void
}

const CustomerAddressInfo: React.FC<CustomerAddressInfoProps> = ({
  formData,
  onFieldChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Địa chỉ"
          placeholder="Số nhà, tòa nhà, ngõ, đường"
          value={formData.address}
          onChange={(value) => onFieldChange('address', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Khu vực"
          placeholder="Chọn Tỉnh/TP - Quận/Huyện"
          value={formData.region}
          onChange={(value) => onFieldChange('region', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Phường/Xã"
          placeholder="Chọn Phường/Xã"
          value={formData.ward}
          onChange={(value) => onFieldChange('ward', value)}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerAddressInfo
