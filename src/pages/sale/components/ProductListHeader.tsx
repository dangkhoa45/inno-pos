import { useState } from 'react'

import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ProductFilterPopover from './ProductFilterPopover'
import { mockProducts } from '../../../mockup/data-product'

import type { Product } from '../../../types/sale'

interface FilterOptions {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  inStockOnly: boolean
}

interface ProductListHeaderProps {
  onSearchResults: (products: Product[]) => void
  onFiltersChange: (filters: FilterOptions) => void
}

const ProductListHeader = ({
  onSearchResults,
  onFiltersChange,
}: ProductListHeaderProps) => {
  const [searchValue, setSearchValue] = useState<Product | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [filterPopoverAnchor, setFilterPopoverAnchor] =
    useState<null | HTMLElement>(null)
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: 10000000 },
    inStockOnly: false,
  })

  const getFilteredProducts = (searchTerm: string, filters: any) => {
    let filtered = mockProducts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Group filter
    const groups = filters.groups || []
    if (groups.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.group && groups.some((g: string) => product.group === g),
      )
    }

    // Brand filter
    const brands = filters.brands || []
    if (brands.length > 0) {
      filtered = filtered.filter(
        (product) => product.brand && brands.includes(product.brand),
      )
    }

    // Spec filter
    const specs = filters.specs || []
    if (specs.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.spec && product.spec.some((s) => specs.includes(s)),
      )
    }

    // Color filter
    const colors = filters.colors || []
    if (colors.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.color && product.color.some((c) => colors.includes(c)),
      )
    }

    // Material filter
    const materials = filters.materials || []
    if (materials.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.material &&
          product.material.some((m) => materials.includes(m)),
      )
    }

    // Category filter (giữ lại nếu cần)
    const categories = filters.categories || []
    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category),
      )
    }

    // Price range filter (giữ lại nếu cần)
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max,
      )
    }

    // In stock filter (giữ lại nếu cần)
    if (filters.inStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    return filtered
  }

  const handleSearchChange = (value: Product | null, inputValue: string) => {
    setSearchValue(value)
    setInputValue(inputValue)

    const searchTerm = value ? value.name : inputValue
    const filtered = getFilteredProducts(searchTerm, activeFilters)
    onSearchResults(filtered)
  }

  const handleOpenFilterPopover = (event: React.MouseEvent<HTMLElement>) => {
    setFilterPopoverAnchor(event.currentTarget)
  }

  const handleCloseFilterPopover = () => {
    setFilterPopoverAnchor(null)
  }

  const handleApplyFilters = (filters: any) => {
    // Merge filters với các trường mặc định để tránh undefined
    setActiveFilters((prev) => ({
      ...prev,
      ...filters,
      categories: prev.categories || [],
      priceRange: prev.priceRange || { min: 0, max: 10000000 },
      inStockOnly: prev.inStockOnly ?? false,
    }))
    setFilterPopoverAnchor(null)
    const searchTerm = searchValue ? searchValue.name : inputValue
    const mergedFilters = {
      ...activeFilters,
      ...filters,
      categories: activeFilters.categories || [],
      priceRange: activeFilters.priceRange || { min: 0, max: 10000000 },
      inStockOnly: activeFilters.inStockOnly ?? false,
    }
    const filtered = getFilteredProducts(searchTerm, mergedFilters)
    onSearchResults(filtered)
    onFiltersChange(mergedFilters)
  }

  const getActiveFilterCount = () => {
    return activeFilters.categories.length + (activeFilters.inStockOnly ? 1 : 0)
  }

  return (
    <Box
      sx={{
        pt: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          alignItems: 'center',
          mb: { xs: 1, sm: 2 },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Autocomplete
          freeSolo
          options={mockProducts}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
          }
          value={searchValue}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
            handleSearchChange(null, newInputValue)
          }}
          onChange={(_, newValue) => {
            if (typeof newValue === 'string') {
              handleSearchChange(null, newValue)
            } else {
              handleSearchChange(newValue, newValue ? newValue.name : '')
            }
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box>
                <Typography variant="body2">{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.price > 0 ? `VND ${option.price}` : 'Free'}
                </Typography>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 300 },
                width: { xs: '100%', sm: 'auto' },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon color="action" sx={{ pl: 1 }} />,
              }}
            />
          )}
        />
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
          <IconButton
            onClick={handleOpenFilterPopover}
            color={getActiveFilterCount() > 0 ? 'primary' : 'default'}
            size="small"
          >
            <FilterListIcon />
          </IconButton>
          <ProductFilterPopover
            anchorEl={filterPopoverAnchor}
            open={Boolean(filterPopoverAnchor)}
            onClose={handleCloseFilterPopover}
            onApply={handleApplyFilters}
            currentFilters={activeFilters}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ProductListHeader
