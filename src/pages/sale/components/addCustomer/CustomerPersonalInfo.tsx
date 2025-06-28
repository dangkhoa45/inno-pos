import React from 'react'

import { Box, Grid } from '@mui/material'

import FormField from '../../../../components/FormField'

interface CustomerPersonalInfoProps {
  formData: {
    birthDate: string
    gender: string
  }
  onFieldChange: (field: string, value: string) => void
}

const CustomerPersonalInfo: React.FC<CustomerPersonalInfoProps> = ({
  formData,
  onFieldChange,
}) => {
  const genderOptions = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
  ]

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
        <Box sx={{ flex: 1 }}>
          <FormField
            label="Ngày sinh"
            type="date"
            value={formData.birthDate}
            onChange={(value) => onFieldChange('birthDate', value)}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormField
            label="Giới tính"
            type="radio"
            radioOptions={genderOptions}
            radioDefaultValue={formData.gender}
            radioName="gender"
            onChange={(value) => onFieldChange('gender', value)}
          />
        </Box>
      </Box>
    </Grid>
  )
}

export default CustomerPersonalInfo
