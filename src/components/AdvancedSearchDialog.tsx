import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Button,
  Typography,
  Avatar,
} from '@mui/material'

import type { Customer } from '../mockup'

interface AdvancedSearchDialogProps {
  open: boolean
  customers: Customer[]
  onClose: () => void
  onSelectCustomer: (customer: Customer) => void
}

const AdvancedSearchDialog: React.FC<AdvancedSearchDialogProps> = ({
  open,
  customers,
  onClose,
  onSelectCustomer,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ fontWeight: 700, color: 'primary.main', fontSize: 22 }}
      >
        Chọn khách hàng
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4} justifyContent="center">
          {customers.map((customer) => (
            <Grid
              component="div"
              size={{ xs: 12, md: 4 }}
              key={customer.id || customer.customerCode}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={customer.avatar}
                  sx={{ width: 140, height: 140, mb: 2, boxShadow: 3 }}
                  alt={customer.name}
                >
                  {customer.name?.[0]}
                </Avatar>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {customer.name}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 2,
                    minWidth: 120,
                  }}
                  onClick={() => onSelectCustomer(customer)}
                >
                  Xác nhận
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default AdvancedSearchDialog
