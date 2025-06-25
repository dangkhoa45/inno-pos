import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

interface DateRangeFilterProps {
  value?: { from: Dayjs | null; to: Dayjs | null }
  onChange?: (value: { from: Dayjs | null; to: Dayjs | null }) => void
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  value,
  onChange,
}) => {
  const [cleared, setCleared] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false)
      }, 1500)

      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [cleared])

  const [from, setFrom] = React.useState<Dayjs | null>(null)
  const [to, setTo] = React.useState<Dayjs | null>(null)

  const fromValue = value?.from ?? from
  const toValue = value?.to ?? to

  const handleFromChange = (val: Dayjs | null) => {
    if (onChange) onChange({ from: val, to: toValue })
    else setFrom(val)
  }
  const handleToChange = (val: Dayjs | null) => {
    if (onChange) onChange({ from: fromValue, to: val })
    else setTo(val)
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" gutterBottom mb={1} fontWeight="bold">
        Valid Date Range
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
              From
            </Typography>
            <DatePicker
              value={fromValue}
              onChange={handleFromChange}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  placeholder: 'dd-MM-yyyy',
                },
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
              To
            </Typography>
            <DatePicker
              value={toValue}
              onChange={handleToChange}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  placeholder: 'dd-MM-yyyy',
                },
                field: { clearable: true, onClear: () => setCleared(true) },
              }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  )
}

export default DateRangeFilter
