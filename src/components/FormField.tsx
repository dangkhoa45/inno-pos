import React from 'react'

import { CalendarToday } from '@mui/icons-material'
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

interface FormFieldProps {
  label: string
  type?: 'text' | 'date' | 'radio' | 'multiline'
  placeholder?: string
  disabled?: boolean
  value?: string
  rows?: number
  radioOptions?: Array<{ value: string; label: string }>
  radioDefaultValue?: string
  radioName?: string
  onChange?: (value: any) => void
  sx?: any
  format?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  disabled = false,
  value,
  rows = 1,
  radioOptions = [],
  radioDefaultValue,
  radioName,
  onChange,
  sx,
  format,
}) => {
  const labelStyle = {
    fontWeight: 500,
    color: '#666',
    mb: 0.5,
    display: 'block',
  }

  const textFieldStyle = {
    borderRadius: 2,
    ...sx,
  }

  const renderField = () => {
    switch (type) {
      case 'date':
        return (
          <DatePicker
            sx={{ width: '100%' }}
            format={format || 'DD/MM/YYYY'}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                fullWidth: true,
                sx: textFieldStyle,
              },
              openPickerButton: {
                children: <CalendarToday fontSize="small" />,
              },
            }}
            value={value ? dayjs(value, format || 'DD/MM/YYYY') : null}
            onChange={(date) => {
              if (onChange) {
                onChange(date ? date.format(format || 'DD/MM/YYYY') : '')
              }
            }}
          />
        )

      case 'radio':
        return (
          <RadioGroup row defaultValue={radioDefaultValue} name={radioName}>
            {radioOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        )

      case 'multiline':
        return (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            sx={textFieldStyle}
          />
        )

      default:
        return (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            sx={textFieldStyle}
          />
        )
    }
  }

  return (
    <Box>
      <Typography variant="caption" sx={labelStyle}>
        {label}
      </Typography>
      {renderField()}
    </Box>
  )
}

export default FormField
