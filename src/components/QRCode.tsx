import React from 'react'

import QrCodeIcon from '@mui/icons-material/QrCode'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface QRCodeProps {
  value: string
  size?: number
  showText?: boolean
}

const QRCode: React.FC<QRCodeProps> = ({
  value: _value,
  size = 150,
  showText = false,
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: 'white',
        border: 2,
        borderColor: 'grey.300',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* QR Pattern Simulation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, #000 15%, transparent 15%),
            radial-gradient(circle at 80% 20%, #000 15%, transparent 15%),
            radial-gradient(circle at 20% 80%, #000 15%, transparent 15%),
            linear-gradient(45deg, #000 25%, transparent 25%),
            linear-gradient(-45deg, #000 25%, transparent 25%)
          `,
          backgroundSize: '20px 20px, 20px 20px, 20px 20px, 8px 8px, 8px 8px',
          opacity: 0.1,
        }}
      />

      <QrCodeIcon
        sx={{
          fontSize: size * 0.3,
          color: 'grey.600',
          zIndex: 1,
        }}
      />

      {showText && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            fontSize: size * 0.08,
            zIndex: 1,
          }}
        >
          QR CODE
        </Typography>
      )}

      {/* Corner markers simulation */}
      {[
        { top: 8, left: 8 },
        { top: 8, right: 8 },
        { bottom: 8, left: 8 },
      ].map((position, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: size * 0.15,
            height: size * 0.15,
            border: '2px solid',
            borderColor: 'grey.400',
            ...position,
          }}
        />
      ))}
    </Box>
  )
}

export default QRCode
