import React from 'react'

import { Grid } from '@mui/material'

import FormField from '../../../../components/FormField'

import type { CustomerBasicInfoData } from './types'

interface CustomerBasicInfoProps {
  formData: CustomerBasicInfoData
  onFieldChange: (field: string, value: string) => void
}

const CustomerBasicInfo: React.FC<CustomerBasicInfoProps> = ({
  formData,
  onFieldChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Mã khách hàng"
          value={formData.customerCode}
          disabled
          sx={{
            fontWeight: 600,
            background: '#f8f8f8',
          }}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Tên khách hàng"
          value={formData.customerName}
          onChange={(value) => onFieldChange('customerName', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Số điện thoại"
          value={formData.phone}
          onChange={(value) => onFieldChange('phone', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Email"
          value={formData.email}
          onChange={(value) => onFieldChange('email', value)}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerBasicInfo
