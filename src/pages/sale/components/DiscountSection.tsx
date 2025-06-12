import React from 'react'

import { mdiSaleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import {
  mockDiscountOptions,
  type DiscountOption,
} from '../mockup/data-discount'

interface DiscountSectionProps {
  discount: number
  discountType: 'percent' | 'amount'
  onDiscountChange: (value: number) => void
  onDiscountTypeChange: (type: 'percent' | 'amount') => void
  disabled?: boolean
}

const DiscountSection: React.FC<DiscountSectionProps> = ({
  discount,
  discountType,
  onDiscountChange,
  onDiscountTypeChange,
  disabled = false,
}) => {
  const handleAutocompleteChange = (
    _event: any,
    value: string | DiscountOption | null,
  ) => {
    // Prevent selection when disabled
    if (disabled) {
      return
    }

    if (value && typeof value === 'object') {
      onDiscountChange(value.value)
      onDiscountTypeChange(value.type)
    } else {
      // Reset discount when user clears selection
      onDiscountChange(0)
      onDiscountTypeChange('percent')
    }
  }

  const currentOption = mockDiscountOptions.find(
    (option) => option.value === discount && option.type === discountType,
  )

  // Clear selection when disabled (cart is empty)
  const displayValue = disabled ? null : currentOption || null

  return (
    <Box sx={{ mb: 1.5 }}>
      <Autocomplete
        size="small"
        options={mockDiscountOptions}
        disabled={disabled}
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : `${option.title} - ${option.label}`
        }
        value={displayValue}
        onChange={handleAutocompleteChange}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {option.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.desc} • {option.label}
              </Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={
              disabled ? 'Add items to apply discount' : 'Add discount'
            }
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    path={mdiSaleOutline}
                    size={1}
                    color="rgba(0, 0, 0, 0.6)"
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: '#fff',
                '& fieldset': {
                  borderStyle: 'dashed',
                  borderWidth: '1px',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: '#424242',
                  borderStyle: 'dashed',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#424242',
                  borderStyle: 'dashed',
                  borderWidth: '2px',
                },
              },
              '& .MuiAutocomplete-endAdornment': {
                display: 'none',
              },
            }}
          />
        )}
        sx={{
          width: '100%',
        }}
        clearOnEscape
      />
    </Box>
  )
}

export default DiscountSection
