import React from 'react'

import { mdiSaleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import DiscountPopup from '../../../components/discount/DiscountPopup'
import {
  mockDiscountOptions,
  type DiscountOption,
} from '../../../mockup/data-discount'

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
  const theme = useTheme()
  const [popupOpen, setPopupOpen] = React.useState(false)

  const currentOption = mockDiscountOptions.find(
    (option) => option.value === discount && option.type === discountType,
  )

  const handleSelectDiscount = (option: DiscountOption | null) => {
    if (option) {
      onDiscountChange(option.value)
      onDiscountTypeChange(option.type)
    } else {
      onDiscountChange(0)
      onDiscountTypeChange('percent')
    }
    setPopupOpen(false)
  }

  return (
    <Box sx={{ mb: 1.5 }}>
      <Button
        variant="outlined"
        fullWidth
        startIcon={
          <Icon
            path={mdiSaleOutline}
            size={1}
            color={theme.palette.text.secondary}
          />
        }
        onClick={() => setPopupOpen(true)}
        disabled={disabled}
        sx={{
          justifyContent: 'flex-start',
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: theme.palette.divider,
          textTransform: 'none',
          minHeight: 40,
        }}
      >
        {currentOption && !disabled ? (
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {currentOption.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentOption.label}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {disabled ? 'Add items to apply discount' : 'Add discount'}
          </Typography>
        )}
      </Button>
      <DiscountPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onSelectDiscount={handleSelectDiscount}
        selectedDiscount={currentOption}
      />
    </Box>
  )
}

export default DiscountSection
