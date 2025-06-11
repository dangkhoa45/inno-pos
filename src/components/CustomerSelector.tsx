import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import type { Customer } from '@/pages/sale/components/CustomerInfo'

interface CustomerSelectorProps {
  customers: Customer[]
  onCustomerSelect: (customer: Customer | null) => void
  onCreateNew: () => void
  onAdvancedSearch?: () => void
  filterText?: string
  label?: string
  placeholder?: string
}

const CustomerSelector = ({
  customers,
  onCustomerSelect,
  onCreateNew,
  onAdvancedSearch,
  label = 'Search Customer',
  placeholder = 'Search by customer name, phone, email',
}: CustomerSelectorProps) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ position: 'relative', zIndex: 1000, m: 2, mt: 2.5 }}>
      <Autocomplete
        size="small"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={customers}
        getOptionLabel={(option) => `${option.customerCode} ${option.name}`}
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        onChange={(_, value) => onCustomerSelect(value)}
        disablePortal={false}
        slotProps={{
          popper: {
            sx: {
              zIndex: '99999 !important',
              '& .MuiPaper-root': {
                zIndex: '99999 !important',
              },
            },
          },
        }}
        renderOption={(props, option) => {
          const { key, ...restProps } = props

          return (
            <Box
              component="li"
              key={key}
              {...restProps}
              sx={{
                p: 2,
                borderBottom: '1px solid #f0f0f0',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                },
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {option.customerCode}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#000',
                    mb: 0.5,
                  }}
                >
                  {option.name}, {option.type}, {option.address}, {option.phone}
                </Typography>
              </Box>
            </Box>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
          />
        )}
        ListboxProps={{
          sx: {
            p: 0,
            backgroundColor: '#fff',
            '& .MuiAutocomplete-option[aria-selected="true"]': {
              backgroundColor: '#e3f2fd !important',
            },
          },
        }}
        PaperComponent={({ children, ...paperProps }) => (
          <Box
            {...paperProps}
            sx={{
              backgroundColor: '#fff',
              zIndex: 99999,
              position: 'fixed',
              mt: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              width: '100%',
            }}
          >
            {/* Customer List */}
            <Box
              sx={{
                maxHeight: 300,
                overflow: 'auto',
                backgroundColor: '#fff',
              }}
            >
              {children}
            </Box>
            {/* Filter Info */}
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="body2">
                Filters applied for{' '}
                <span style={{ fontWeight: 700 }}>
                  Is Internal Customer = 0
                </span>
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ p: 1, borderBottom: '1px solid #e0e0e0' }}>
              <Button
                variant="text"
                startIcon={<AddIcon sx={{ fontWeight: 900 }} />}
                onClick={onCreateNew}
                sx={{
                  textTransform: 'none',
                  minWidth: 'auto',
                  color: '#000',
                  fontSize: '0.875rem',
                  justifyContent: 'flex-start',
                  pl: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}
              >
                Create a new Customer
              </Button>
            </Box>
            <Box sx={{ p: 1, borderBottom: '1px solid #e0e0e0' }}>
              {onAdvancedSearch && (
                <Button
                  variant="text"
                  startIcon={<SearchIcon sx={{ fontWeight: 900 }} />}
                  onClick={onAdvancedSearch}
                  size="small"
                  sx={{
                    textTransform: 'none',
                    minWidth: 'auto',
                    color: '#000',
                    fontSize: '0.875rem',
                    justifyContent: 'flex-start',
                    pl: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Advanced Search
                </Button>
              )}
            </Box>
          </Box>
        )}
        noOptionsText={
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No customers found
            </Typography>
          </Box>
        }
      />
    </Box>
  )
}

export default CustomerSelector
