import React from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

interface SpecFilterProps {
  value: string[]
  onChange: (value: string[]) => void
  options: string[]
}

const SpecFilter: React.FC<SpecFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  const isAllSelected =
    options.length > 0 && options.every((s) => value.includes(s))
  const handleAll = () => {
    if (isAllSelected) onChange([])
    else onChange(options)
  }
  const handleToggle = (spec: string) => {
    if (value.includes(spec)) onChange(value.filter((s) => s !== spec))
    else onChange([...value, spec])
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
      <Typography fontWeight="bold">Lọc theo thông số kỹ thuật</Typography>
      <FormControlLabel
        control={<Checkbox checked={isAllSelected} onChange={handleAll} />}
        label="Tất cả"
        sx={{ my: -1 }}
      />
      {options.map((spec) => (
        <FormControlLabel
          key={spec}
          control={
            <Checkbox
              checked={value.includes(spec)}
              onChange={() => handleToggle(spec)}
            />
          }
          label={spec}
          sx={{ my: -1 }}
        />
      ))}
    </Box>
  )
}

export default SpecFilter
