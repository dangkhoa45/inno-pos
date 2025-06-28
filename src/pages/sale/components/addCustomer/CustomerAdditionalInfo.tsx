import React from 'react'

import { Grid } from '@mui/material'

import FormField from '../../../../components/FormField'

interface CustomerAdditionalInfoProps {
  formData: {
    customerType: string
    taxCode: string
    idNumber: string
    facebook: string
    group: string
    notes: string
  }
  onFieldChange: (field: string, value: string) => void
}

const CustomerAdditionalInfo: React.FC<CustomerAdditionalInfoProps> = ({
  formData,
  onFieldChange,
}) => {
  const customerTypeOptions = [
    { value: 'individual', label: 'Cá nhân' },
    { value: 'company', label: 'Công ty' },
  ]

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Loại khách"
          type="radio"
          radioOptions={customerTypeOptions}
          radioDefaultValue={formData.customerType}
          radioName="customerType"
          onChange={(value) => onFieldChange('customerType', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Mã số thuế"
          value={formData.taxCode}
          onChange={(value) => onFieldChange('taxCode', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Số CMND/CCCD"
          value={formData.idNumber}
          onChange={(value) => onFieldChange('idNumber', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Facebook"
          value={formData.facebook}
          onChange={(value) => onFieldChange('facebook', value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          label="Nhóm"
          value={formData.group}
          onChange={(value) => onFieldChange('group', value)}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FormField
          label="Ghi chú"
          type="multiline"
          rows={2}
          value={formData.notes}
          onChange={(value) => onFieldChange('notes', value)}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerAdditionalInfo
