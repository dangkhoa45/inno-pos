import { useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { mockProducts } from '../mockup/data-product'

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
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: 10000000 },
    inStockOnly: false,
  })

  const categories = Array.from(
    new Set(mockProducts.map((product) => product.category)),
  ).sort()

  const getFilteredProducts = (searchTerm: string, filters: FilterOptions) => {
    let filtered = mockProducts

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category),
      )
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max,
    )

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

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null)
  }

  const handleCategoryFilter = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category]

    const newFilters = { ...activeFilters, categories: newCategories }
    setActiveFilters(newFilters)

    const searchTerm = searchValue ? searchValue.name : inputValue
    const filtered = getFilteredProducts(searchTerm, newFilters)
    onSearchResults(filtered)
    onFiltersChange(newFilters)
  }

  const handleStockFilter = () => {
    const newFilters = {
      ...activeFilters,
      inStockOnly: !activeFilters.inStockOnly,
    }
    setActiveFilters(newFilters)

    const searchTerm = searchValue ? searchValue.name : inputValue
    const filtered = getFilteredProducts(searchTerm, newFilters)
    onSearchResults(filtered)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const newFilters = {
      categories: [],
      priceRange: { min: 0, max: 10000000 },
      inStockOnly: false,
    }
    setActiveFilters(newFilters)
    setSearchValue(null)
    setInputValue('')

    onSearchResults(mockProducts)
    onFiltersChange(newFilters)
  }

  const removeFilter = (filterType: string, value?: string) => {
    const newFilters = { ...activeFilters }

    if (filterType === 'category' && value) {
      newFilters.categories = newFilters.categories.filter((c) => c !== value)
    } else if (filterType === 'stock') {
      newFilters.inStockOnly = false
    }

    setActiveFilters(newFilters)

    const searchTerm = searchValue ? searchValue.name : inputValue
    const filtered = getFilteredProducts(searchTerm, newFilters)
    onSearchResults(filtered)
    onFiltersChange(newFilters)
  }

  const getActiveFilterCount = () => {
    return activeFilters.categories.length + (activeFilters.inStockOnly ? 1 : 0)
  }

  return (
    <Box sx={{ pt: 2, px: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 2,
          justifyContent: 'space-between',
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
              sx={{ minWidth: 300 }}
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon color="action" sx={{ pl: 1 }} />,
              }}
            />
          )}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {(getActiveFilterCount() > 0 || searchValue || inputValue) && (
            <Button
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              size="small"
              variant="outlined"
            >
              Clear All
            </Button>
          )}
          <IconButton
            onClick={handleFilterMenuOpen}
            color={getActiveFilterCount() > 0 ? 'primary' : 'default'}
            sx={{
              border: 1,
              borderColor:
                getActiveFilterCount() > 0 ? 'primary.main' : 'divider',
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {(getActiveFilterCount() > 0 || searchValue) && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {searchValue && (
            <Chip
              label={`Search: ${searchValue.name}`}
              onDelete={() => {
                setSearchValue(null)
                setInputValue('')
                const filtered = getFilteredProducts('', activeFilters)
                onSearchResults(filtered)
              }}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          )}

          {activeFilters.categories.map((category) => (
            <Chip
              key={category}
              label={`Category: ${category}`}
              onDelete={() => removeFilter('category', category)}
              size="small"
              color="secondary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}

          {activeFilters.inStockOnly && (
            <Chip
              label="In Stock"
              onDelete={() => removeFilter('stock')}
              size="small"
              color="success"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          )}
        </Box>
      )}

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterMenuClose}
        PaperProps={{
          sx: { minWidth: 250, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Filters
          </Typography>
        </Box>

        <Divider />

        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={activeFilters.inStockOnly}
                onChange={handleStockFilter}
                size="small"
              />
            }
            label="Show only products in stock"
          />
        </MenuItem>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
            Categories
          </Typography>
          {categories.map((category) => (
            <MenuItem key={category} dense>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeFilters.categories.includes(category)}
                    onChange={() => handleCategoryFilter(category)}
                    size="small"
                  />
                }
                label={category}
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  )
}

export default ProductListHeader
