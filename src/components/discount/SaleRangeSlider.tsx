import React from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

interface SaleRangeSliderProps {
  hideTitle?: boolean
  value?: number[]
  onChange?: (value: number[]) => void
}

const SaleRangeSlider: React.FC<SaleRangeSliderProps> = ({
  hideTitle = false,
  value,
  onChange,
}) => {
  const [range, setRange] = React.useState<number[]>([0, 80])
  const sliderValue = value ?? range

  const handleChange = (_: any, val: number | number[]) => {
    if (onChange) onChange(val as number[])
    else setRange(val as number[])
  }

  return (
    <Box sx={{ pt: 1 }}>
      {!hideTitle && (
        <Typography variant="body2" gutterBottom fontWeight="bold">
          Sale Range
        </Typography>
      )}
      <Slider
        size="small"
        min={0}
        max={100}
        value={sliderValue}
        onChange={handleChange}
        disableSwap
        sx={{ color: 'grey.600', mt: 2 }}
      />
    </Box>
  )
}

export default SaleRangeSlider
