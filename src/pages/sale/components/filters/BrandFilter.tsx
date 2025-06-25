import React from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

interface BrandFilterProps {
  value: string[]
  onChange: (value: string[]) => void
  options: string[]
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  const isAllSelected =
    options.length > 0 && options.every((b) => value.includes(b))
  const handleAll = () => {
    if (isAllSelected) onChange([])
    else onChange(options)
  }
  const handleToggle = (brand: string) => {
    if (value.includes(brand)) onChange(value.filter((b) => b !== brand))
    else onChange([...value, brand])
  }
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography fontWeight="bold">Lọc theo thương hiệu</Typography>
      <FormControlLabel
        control={<Checkbox checked={isAllSelected} onChange={handleAll} />}
        label={<Typography fontSize={15}>Tất cả</Typography>}
        sx={{ my: -1 }}
      />
      {options.map((brand) => (
        <FormControlLabel
          key={brand}
          control={
            <Checkbox
              checked={value.includes(brand)}
              onChange={() => handleToggle(brand)}
            />
          }
          label={<Typography fontSize={15}>{brand}</Typography>}
          sx={{ my: -1 }}
        />
      ))}
    </Box>
  )
}

export default BrandFilter
