import React, { useState } from 'react'

import PhotoCameraOutlined from '@mui/icons-material/PhotoCameraOutlined'
import { Box } from '@mui/material'

import FaceCaptureDialog from './FaceCaptureDialog'

interface AvatarUploadProps {
  avatarUrl: string | null
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFaceImagesChange?: (images: {
    left: string | null
    center: string | null
    right: string | null
  }) => void
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  onAvatarChange,
  onFaceImagesChange,
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleAvatarClick = () => {
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const handleFaceDialogConfirm = (images: {
    left: string | null
    center: string | null
    right: string | null
  }) => {
    if (onFaceImagesChange) onFaceImagesChange(images)
    setOpenDialog(false)
  }

  return (
    <>
      <Box
        sx={{
          width: 230,
          height: 230,
          borderRadius: '50%',
          backgroundColor: '#dbdbdb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s',
          boxShadow: 1,
          '&:hover': {
            boxShadow: 4,
            backgroundColor: '#d0d0d0',
          },
        }}
        onClick={handleAvatarClick}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        ) : (
          <PhotoCameraOutlined sx={{ fontSize: 48, color: '#888' }} />
        )}
        <input
          id="customer-avatar-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onClick={(e) => e.stopPropagation()}
          onChange={onAvatarChange}
        />
      </Box>
      <FaceCaptureDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleFaceDialogConfirm}
      />
    </>
  )
}

export default AvatarUpload
