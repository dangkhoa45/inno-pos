import { useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import AdvancedSearchDialog from '../../../components/AdvancedSearchDialog'
import CustomerDetailDialog from '../../../components/CustomerDetailDialog'
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
  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false)
  const [selectedCustomerForDetail, setSelectedCustomerForDetail] =
    useState<Customer | null>(null)
  const [openCustomerDetail, setOpenCustomerDetail] = useState(false)

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
    setOpenAdvancedSearch(true)
  }

  const handleSelectCustomerFromAdvanced = (customer: Customer) => {
    setSelectedCustomerForDetail(customer)
    setOpenAdvancedSearch(false)
    setOpenCustomerDetail(true)
  }

  const handleCloseCustomerDetail = () => {
    setOpenCustomerDetail(false)
    if (selectedCustomerForDetail) {
      setSelectedCustomer(selectedCustomerForDetail)
      onCustomerChange?.(selectedCustomerForDetail)
    }
  }

  const handleBackToAdvanced = () => {
    setOpenCustomerDetail(false)
    setOpenAdvancedSearch(true)
  }

  return (
    <Paper
      sx={{
        border: 1,
        borderColor: 'divider',
        height: { xs: '60px', sm: '80px' },
      }}
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
              gap: { xs: 1, sm: 2 },
              m: { xs: 1, sm: 2 },
            }}
          >
            <Avatar
              src={selectedCustomer.avatar}
              sx={{ width: { xs: 32, sm: 48 }, height: { xs: 32, sm: 48 } }}
            >
              {!selectedCustomer.avatar && <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}
              >
                {selectedCustomer.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
              >
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
      <AdvancedSearchDialog
        open={openAdvancedSearch}
        customers={mockCustomers.slice(0, 3)}
        onClose={() => setOpenAdvancedSearch(false)}
        onSelectCustomer={handleSelectCustomerFromAdvanced}
      />
      <CustomerDetailDialog
        open={openCustomerDetail}
        customer={selectedCustomerForDetail}
        onClose={handleCloseCustomerDetail}
        onBack={handleBackToAdvanced}
      />
    </Paper>
  )
}

export default CustomerInfo
