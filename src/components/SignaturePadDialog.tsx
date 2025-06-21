import { useRef, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SignatureCanvas from 'react-signature-canvas'

interface SignaturePadDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: (signature: string) => void
}

export function SignaturePadDialog({
  open,
  onClose,
  onConfirm,
}: SignaturePadDialogProps) {
  const sigPad = useRef<SignatureCanvas | null>(null)
  const [isSigned, setIsSigned] = useState(false)

  const clear = () => {
    sigPad.current?.clear()
    setIsSigned(false)
  }

  const handleConfirm = () => {
    if (sigPad.current) {
      const signature = sigPad.current.toDataURL()
      onConfirm(signature)
    }
  }

  const handleBeginStroke = () => {
    setIsSigned(true)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Customer Signature</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Please sign in the box below
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            border: '1px dashed grey',
            borderRadius: 1,
            height: 250,
            width: '100%',
          }}
        >
          <SignatureCanvas
            ref={sigPad}
            penColor="black"
            canvasProps={{
              style: { width: '100%', height: '100%', cursor: 'crosshair' },
            }}
            onBegin={handleBeginStroke}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button onClick={clear} disabled={!isSigned}>
          Clear Signature
        </Button>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!isSigned}
          >
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
} 