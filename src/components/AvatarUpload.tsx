import React from 'react'

import PhotoCameraOutlined from '@mui/icons-material/PhotoCameraOutlined'
import { Box } from '@mui/material'

interface AvatarUploadProps {
  avatarUrl: string | null
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  onAvatarChange,
}) => {
  return (
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
      onClick={() => {
        document.getElementById('customer-avatar-input')?.click()
      }}
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
  )
}

export default AvatarUpload
