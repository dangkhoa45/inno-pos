import React from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

interface MaterialFilterProps {
  value: string[]
  onChange: (value: string[]) => void
  options: string[]
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  const isAllSelected =
    options.length > 0 && options.every((m) => value.includes(m))
  const handleAll = () => {
    if (isAllSelected) onChange([])
    else onChange(options)
  }
  const handleToggle = (mat: string) => {
    if (value.includes(mat)) onChange(value.filter((m) => m !== mat))
    else onChange([...value, mat])
  }
  return (
    <Box m={1} display="flex" flexDirection="column" gap={1} mt={0}>
      <Typography fontWeight="bold" fontSize={14}>
        Chất liệu
      </Typography>
      <Box mx={2} display="flex" flexDirection="column" gap={1}>
        <FormControlLabel
          control={<Checkbox checked={isAllSelected} onChange={handleAll} />}
          label="Tất cả"
          sx={{ m: -1 }}
        />
        {options.map((mat) => (
          <FormControlLabel
            key={mat}
            control={
              <Checkbox
                checked={value.includes(mat)}
                onChange={() => handleToggle(mat)}
              />
            }
            label={mat}
            sx={{ m: -1 }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MaterialFilter
