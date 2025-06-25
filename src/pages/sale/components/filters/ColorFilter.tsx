import React from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

interface ColorOption {
  id: string
  label: string
  color: string
}

interface ColorFilterProps {
  value: string[]
  onChange: (value: string[]) => void
  options: ColorOption[]
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  const handleToggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((c) => c !== id))
    else onChange([...value, id])
  }
  return (
    <Box m={1}>
      <Typography fontWeight="bold" fontSize={14}>
        Màu sắc
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" mx={2} my={1}>
        {options.map((color) => (
          <FormControlLabel
            key={color.id}
            control={
              <Checkbox
                checked={value.includes(color.id)}
                onChange={() => handleToggle(color.id)}
                sx={{
                  background: `${color.color}`,
                  width: 18,
                  height: 18,
                  border: `1px solid ${color.color}`,
                  borderRadius: 0.2,
                  mr: 1,
                }}
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <span>{color.label}</span>
              </Box>
            }
            sx={{
              minWidth: 120,
              p: 0.5,
              mx: 0,
              '& .MuiSvgIcon-root': {
                display: 'flex',
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ColorFilter
