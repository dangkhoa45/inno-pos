import { useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import CustomerSelector from '../../../components/CustomerSelector'
import { mockCustomers, type Customer } from '../../../mockup'

interface CustomerInfoProps {
  onCustomerChange?: (customer: Customer | null) => void
  onCreateNewCustomer?: () => void
}

const CustomerInfo = ({
  onCustomerChange,
  onCreateNewCustomer,
}: CustomerInfoProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )

  const handleCustomerSelect = (customer: Customer | null) => {
    setSelectedCustomer(customer)
    onCustomerChange?.(customer)
  }

  const handleClearCustomer = () => {
    setSelectedCustomer(null)
    onCustomerChange?.(null)
  }

  const handleCreateNewCustomer = () => {
    if (typeof onCreateNewCustomer === 'function') {
      onCreateNewCustomer()
    }
  }

  const handleAdvancedSearch = () => {
    // TODO: Open advanced search dialog
  }

  return (
    <Paper
      sx={{ border: 1, borderColor: 'divider', height: '80px' }}
      elevation={0}
    >
      <Box>
        {!selectedCustomer ? (
          <CustomerSelector
            customers={mockCustomers}
            onCustomerSelect={handleCustomerSelect}
            onCreateNew={handleCreateNewCustomer}
            onAdvancedSearch={handleAdvancedSearch}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              m: 2,
            }}
          >
            <Avatar
              src={selectedCustomer.avatar}
              sx={{ width: 48, height: 48 }}
            >
              {!selectedCustomer.avatar && <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {selectedCustomer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedCustomer.phone}
              </Typography>
            </Box>
            <IconButton
              onClick={handleClearCustomer}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default CustomerInfo
