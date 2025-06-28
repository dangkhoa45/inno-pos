import React, { useRef, useState, useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  Box,
} from '@mui/material'

import FaceCameraBox from './FaceCameraBox'
import FaceInstructions from './FaceInstructions'
import FacePreviewList from './FacePreviewList'

interface FaceCaptureDialogProps {
  open: boolean
  onClose: () => void
  onConfirm?: (images: {
    left: string | null
    center: string | null
    right: string | null
  }) => void
}

const instructions = [
  'Position the face within the frame throughout the process.',
  'Make sure your face is well-lit and clearly visible.',
  'Please make sure only one person is in the frame during face detection.',
]

const FaceCaptureDialog: React.FC<FaceCaptureDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [captured, setCaptured] = useState<{
    left: string | null
    center: string | null
    right: string | null
  }>({ left: null, center: null, right: null })

  useEffect(() => {
    if (open) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream)
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
          }
        })
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
    }
    // cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
    // eslint-disable-next-line
  }, [open])

  const handleCapture = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg')
      setCaptured((prev) => {
        if (!prev.left) return { ...prev, left: dataUrl }
        if (!prev.center) return { ...prev, center: dataUrl }
        if (!prev.right) return { ...prev, right: dataUrl }
        return prev // Đã đủ 3 ảnh
      })
    }
  }

  const handleDelete = (pos: 'left' | 'center' | 'right') => {
    setCaptured((prev) => ({ ...prev, [pos]: null }))
  }

  const isFull = captured.left && captured.center && captured.right

  const handleConfirm = () => {
    if (onConfirm) onConfirm(captured)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          height: '700px',
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: 700, color: 'primary.main', fontSize: 22 }}
      >
        <span>Nhận diện khuôn mặt khách hàng</span>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 4 }}>
            <FaceCameraBox
              videoRef={videoRef as React.RefObject<HTMLVideoElement>}
              open={open}
              handleCapture={handleCapture}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FacePreviewList captured={captured} onDelete={handleDelete} />
            <FaceInstructions instructions={instructions} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  minWidth: 120,
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: 3,
                  boxShadow: 1,
                }}
                onClick={handleConfirm}
                disabled={!isFull}
              >
                Xác nhận
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default FaceCaptureDialog
