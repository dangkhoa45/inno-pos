import React from 'react'

import { Box, Button } from '@mui/material'

interface FaceCameraBoxProps {
  videoRef: React.RefObject<HTMLVideoElement>
  open: boolean
  handleCapture: () => void
}

const FaceCameraBox: React.FC<FaceCameraBoxProps> = ({
  videoRef,
  open,
  handleCapture,
}) => {
  return (
    <Box
      sx={{
        width: 440,
        height: 600,
        borderRadius: 4,
        background: '#e0e0e0',
        overflow: 'hidden',
        position: 'relative',
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {open && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8,
          }}
        />
      )}
      {/* Overlay khung nhận diện khuôn mặt */}
      <svg
        width="220"
        height="220"
        style={{ position: 'absolute', top: 130, left: 110 }}
      >
        {/* 4 góc */}
        {/* Top-left */}
        <polyline
          points="0,0 0,36 0,0 36,0"
          stroke="#00eaff"
          strokeWidth="6"
          fill="none"
          opacity="0.95"
        />
        {/* Top-right */}
        <polyline
          points="220,0 184,0 220,0 220,36"
          stroke="#00eaff"
          strokeWidth="6"
          fill="none"
          opacity="0.95"
        />
        {/* Bottom-left */}
        <polyline
          points="0,220 0,184 0,220 36,220"
          stroke="#00eaff"
          strokeWidth="6"
          fill="none"
          opacity="0.95"
        />
        {/* Bottom-right */}
        <polyline
          points="220,220 184,220 220,220 220,184"
          stroke="#00eaff"
          strokeWidth="6"
          fill="none"
          opacity="0.95"
        />
        {/* Đường kẻ mắt (ngang) */}
        <line
          x1="36"
          y1="110"
          x2="184"
          y2="110"
          stroke="#00eaff"
          strokeWidth="3"
          opacity="0.7"
          strokeDasharray="10 8"
        />
        {/* Đường căn dọc */}
        <line
          x1="110"
          y1="36"
          x2="110"
          y2="184"
          stroke="#00eaff"
          strokeWidth="2.5"
          opacity="0.5"
          strokeDasharray="10 8"
        />
      </svg>
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 600,
          fontSize: 18,
          px: 4,
          py: 1.5,
        }}
        onClick={handleCapture}
      >
        Chụp ảnh
      </Button>
    </Box>
  )
}

export default FaceCameraBox
