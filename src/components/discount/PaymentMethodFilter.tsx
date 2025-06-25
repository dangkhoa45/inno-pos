import React from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'

interface PaymentMethodFilterProps {
  hideTitle?: boolean
  value?: string[]
  onChange?: (value: string[]) => void
}

const methods = ['Cash', 'Apple Pay', 'Master Card']

const PaymentMethodFilter: React.FC<PaymentMethodFilterProps> = ({
  hideTitle = false,
  value,
  onChange,
}) => {
  const [checked, setChecked] = React.useState<string[]>([])
  const checkedValue = value ?? checked

  const handleChange = (method: string) => {
    let newChecked: string[]
    if (checkedValue.includes(method)) {
      newChecked = checkedValue.filter((m) => m !== method)
    } else {
      newChecked = [...checkedValue, method]
    }
    if (onChange) onChange(newChecked)
    else setChecked(newChecked)
  }

  return (
    <Box sx={{ mb: 2 }}>
      {!hideTitle && (
        <Typography variant="body2" gutterBottom fontWeight="bold">
          Payment Method
        </Typography>
      )}
      <FormGroup>
        {methods.map((method) => (
          <FormControlLabel
            key={method}
            control={
              <Checkbox
                size="small"
                checked={checkedValue.includes(method)}
                onChange={() => handleChange(method)}
              />
            }
            label={method}
          />
        ))}
      </FormGroup>
    </Box>
  )
}

export default PaymentMethodFilter
