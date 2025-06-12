import { useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import CustomerSelector from '../../../components/CustomerSelector'

export type Customer = {
  id: string
  customerCode: string
  name: string
  phone: string
  email?: string
  address?: string
  avatar?: string
  type?: string
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    customerCode: 'CUST-2025-05595',
    name: 'John Smith',
    phone: '0901234567',
    email: 'johnsmith@email.com',
    address: 'Vietnam',
    avatar: '',
    type: 'individual',
  },
  {
    id: '2',
    customerCode: 'CUST-2025-05596',
    name: 'Jane Doe',
    phone: '0907654321',
    email: 'janedoe@email.com',
    address: 'Vietnam',
    avatar: '',
    type: 'individual',
  },
  {
    id: '3',
    customerCode: 'CUST-2025-05597',
    name: 'Michael Johnson',
    phone: '0912345678',
    email: 'michaeljohnson@email.com',
    address: 'Vietnam',
    avatar: '',
    type: 'individual',
  },
]

interface CustomerInfoProps {
  onCustomerChange?: (customer: Customer | null) => void
}

const CustomerInfo = ({ onCustomerChange }: CustomerInfoProps) => {
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
    // TODO: Open create customer dialog
    console.log('Open create customer dialog')
  }

  const handleAdvancedSearch = () => {
    // TODO: Open advanced search dialog
    console.log('Open advanced search dialog')
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
