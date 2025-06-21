import React, { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import PrintIcon from '@mui/icons-material/Print'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ReceiptPreview from './ReceiptPreview'

import { SignaturePadDialog } from './SignaturePadDialog'

import type { OrderData } from '../stores/OrderContext'

interface ReceiptDialogProps {
  open: boolean
  onClose: () => void
  orderData: OrderData | null
  paymentData: {
    paymentMethod: string
    totalPaid: number
    changeAmount: number
    splitPayments?: Array<{ method: string; amount: string }>
  }
}

const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  open,
  onClose,
  orderData,
}) => {
  const [customerSignature, setCustomerSignature] = useState<string | null>(null)
  const [staffSignature, setStaffSignature] = useState<string | null>(null)
  const [signatureType, setSignatureType] = useState<'customer' | 'staff' | null>(null)

  if (!orderData) return null

  const handlePrint = () => window.print()

  const handleOpenSignatureDialog = (type: 'customer' | 'staff') => {
    setSignatureType(type)
  }

  const handleCloseSignatureDialog = () => {
    setSignatureType(null)
  }

  const handleConfirmSignature = (signature: string) => {
    if (signatureType === 'customer') {
      setCustomerSignature(signature)
    } else {
      setStaffSignature(signature)
    }
    handleCloseSignatureDialog()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  }

  const subtotal = orderData.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ px: 3, pb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="flex-start" flexDirection={'column'}>
            <Typography fontWeight="bold">Receipt Preview</Typography>
            <Typography variant="caption" color="text.secondary">
              Preview receipt before printing
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          border: 1,
          borderColor: '#ccc',
          m: 3,
          mt: 0,
          mb: 1.3,
          borderRadius: 1,
          bgcolor: 'grey.50',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          flexGrow={1}
          gap={1}
          my={1.5}
          width={'100%'}
        >
          <Typography fontWeight="bold">Preview</Typography>
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DriveFileRenameOutlineIcon />}
              color="secondary"
              sx={{ bgcolor: 'white' }}
              onClick={() => handleOpenSignatureDialog('customer')}
            >
              Customer Signature
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DriveFileRenameOutlineIcon />}
              color="secondary"
              sx={{ bgcolor: 'white' }}
              onClick={() => handleOpenSignatureDialog('staff')}
            >
              Staff Signature
            </Button>
            <IconButton
              onClick={handlePrint}
              color="secondary"
              size="small"
              sx={{ bgcolor: 'white' }}
            >
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>
        <ReceiptPreview
          orderData={orderData}
          customerSignature={customerSignature}
          staffSignature={staffSignature}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
        <Button onClick={handlePrint} variant="contained">
          Print Receipt
        </Button>
      </DialogActions>

      <SignaturePadDialog
        open={!!signatureType}
        onClose={handleCloseSignatureDialog}
        onConfirm={handleConfirmSignature}
      />
    </Dialog>
  )
}

export default ReceiptDialog
