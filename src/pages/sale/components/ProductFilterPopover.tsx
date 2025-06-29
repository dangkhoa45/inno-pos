import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { mockProducts } from '@/mockup/data-product'
import { generateGroupTreeFromProducts } from '@/utils/groupTreeUtils'

import BrandFilter from './filters/BrandFilter'
import ColorFilter from './filters/ColorFilter'
import GroupFilter from './filters/GroupFilter'
import MaterialFilter from './filters/MaterialFilter'
import SpecFilter from './filters/SpecFilter'

interface ProductFilterPopoverProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  onApply: (filters: any) => void
  currentFilters: any
}

const BRANDS = ['Yonex', 'Adidas', 'Nike', 'Puma']
const SPECS = ['Yonex', 'Adidas', 'Nike', 'Puma']
const COLORS = [
  { id: 'red', label: 'Đỏ', color: '#f44336' },
  { id: 'yellow', label: 'Vàng', color: '#ffeb3b' },
  { id: 'green', label: 'Xanh lá', color: '#4caf50' },
  { id: 'blue', label: 'Xanh', color: '#2196f3' },
  { id: 'pink', label: 'Hồng', color: '#e91e63' },
  { id: 'black', label: 'Đen', color: '#222' },
]
const MATERIALS = ['100% Cotton', 'Kaki', 'Len', 'Polyester']

const ProductFilterPopover: React.FC<ProductFilterPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])

  const GROUP_TREE = React.useMemo(
    () => generateGroupTreeFromProducts(mockProducts),
    [],
  )

  useEffect(() => {
    if (open && currentFilters) {
      setSelectedGroups(currentFilters.groups || [])
      setSelectedBrands(currentFilters.brands || [])
      setSelectedSpecs(currentFilters.specs || [])
      setSelectedColors(currentFilters.colors || [])
      setSelectedMaterials(currentFilters.materials || [])
    }
  }, [open, currentFilters])

  const handleApply = () => {
    onApply({
      groups: selectedGroups || [],
      brands: selectedBrands || [],
      specs: selectedSpecs || [],
      colors: selectedColors || [],
      materials: selectedMaterials || [],
    })
  }

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: { xs: 1, sm: 2 },
          minWidth: { xs: '90vw', sm: 800, md: 1200 },
          maxWidth: { xs: '95vw', sm: 1200, md: 1500 },
          maxHeight: { xs: '80vh', sm: '70vh' },
        },
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 1 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <GroupFilter
            value={selectedGroups}
            onChange={setSelectedGroups}
            options={GROUP_TREE}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <BrandFilter
            value={selectedBrands}
            onChange={setSelectedBrands}
            options={BRANDS}
          />
          <SpecFilter
            value={selectedSpecs}
            onChange={setSelectedSpecs}
            options={SPECS}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography fontWeight="bold">Lọc theo màu sắc</Typography>
            <ColorFilter
              value={selectedColors}
              onChange={setSelectedColors}
              options={COLORS}
            />
            <MaterialFilter
              value={selectedMaterials}
              onChange={setSelectedMaterials}
              options={MATERIALS}
            />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          onClick={handleApply}
          sx={{
            minWidth: { xs: 100, sm: 120 },
            fontWeight: 'bold',
            fontSize: { xs: '0.8rem', sm: '1rem' },
          }}
        >
          Xác nhận
        </Button>
      </Box>
    </Popover>
  )
}

export default ProductFilterPopover
