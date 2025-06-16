import React from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
  orderId?: string
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  orderId = '#CUST-2025-05586',
}) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          pb: 1,
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: 64,
            color: theme.palette.success.main,
          }}
        />
        <Typography variant="h5" fontWeight="bold" color="success.main" mb={1}>
          Order Successful!
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" fontWeight="bold">
          Order has been saved successfully
        </Typography>

        <Typography variant="body2" color="primary.main" fontWeight="bold">
          Order ID: {orderId}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pt: 1 }}>
        <Button
          onClick={onClose}
          variant="contained"
          size="large"
          sx={{
            minWidth: 120,
            borderRadius: 2,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessDialog
