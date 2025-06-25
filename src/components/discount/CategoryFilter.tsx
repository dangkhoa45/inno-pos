import React from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const categories = [
  'Loại mặt hàng 1',
  'Loại mặt hàng 2',
  'Loại mặt hàng 3',
  'Loại mặt hàng 4',
  'Loại mặt hàng 5',
  'Loại mặt hàng 6',
]

interface CategoryFilterProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange }) => {
  const [checked, setChecked] = React.useState<string[]>([])
  const checkedValue = value ?? checked

  const handleChange = (cat: string) => {
    let newChecked: string[]
    if (checkedValue.includes(cat)) {
      newChecked = checkedValue.filter((c) => c !== cat)
    } else {
      newChecked = [...checkedValue, cat]
    }
    if (onChange) onChange(newChecked)
    else setChecked(newChecked)
  }

  return (
    <Box>
      <Typography variant="body2" gutterBottom fontWeight="bold">
        Category
      </Typography>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormGroup>
            {categories.slice(0, 3).map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    size="small"
                    checked={checkedValue.includes(cat)}
                    onChange={() => handleChange(cat)}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormGroup>
            {categories.slice(3, 6).map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    size="small"
                    checked={checkedValue.includes(cat)}
                    onChange={() => handleChange(cat)}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CategoryFilter
