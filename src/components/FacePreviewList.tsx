import React from 'react'

import { Box, Paper, Typography } from '@mui/material'

interface FacePreviewListProps {
  captured: {
    left: string | null
    center: string | null
    right: string | null
  }
  onDelete?: (pos: 'left' | 'center' | 'right') => void
}

const FacePreviewList: React.FC<FacePreviewListProps> = ({
  captured,
  onDelete,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 3, mb: 3, justifyContent: 'center' }}>
      {/* Trái */}
      <Paper
        sx={{
          width: 350,
          height: 350,
          borderRadius: 1.5,
          overflow: 'hidden',
          boxShadow: 2,
          position: 'relative',
        }}
      >
        {captured.left ? (
          <>
            <img
              src={captured.left}
              alt="left"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9,
              }}
            />
            {onDelete && (
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <button
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    fontSize: 20,
                  }}
                  onClick={() => onDelete('left')}
                  title="Xóa ảnh"
                >
                  ×
                </button>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              fontSize: 22,
            }}
          >
            Trái
          </Box>
        )}
        <Typography
          sx={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#fff',
            fontWeight: 600,
            textShadow: '0 1px 4px #000',
            fontSize: 18,
          }}
        >
          Trái
        </Typography>
      </Paper>
      {/* Giữa */}
      <Paper
        sx={{
          width: 350,
          height: 350,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 2,
          position: 'relative',
          background: '#444',
        }}
      >
        {captured.center ? (
          <>
            <img
              src={captured.center}
              alt="center"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9,
              }}
            />
            {onDelete && (
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <button
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    fontSize: 20,
                  }}
                  onClick={() => onDelete('center')}
                  title="Xóa ảnh"
                >
                  ×
                </button>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: '#444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 22,
            }}
          >
            Giữa
          </Box>
        )}
        <Typography
          sx={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#fff',
            fontWeight: 600,
            textShadow: '0 1px 4px #000',
            fontSize: 18,
          }}
        >
          Giữa
        </Typography>
      </Paper>
      {/* Phải */}
      <Paper
        sx={{
          width: 350,
          height: 350,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 2,
          position: 'relative',
          background: '#444',
        }}
      >
        {captured.right ? (
          <>
            <img
              src={captured.right}
              alt="right"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9,
              }}
            />
            {onDelete && (
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <button
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    fontSize: 20,
                  }}
                  onClick={() => onDelete('right')}
                  title="Xóa ảnh"
                >
                  ×
                </button>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: '#444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 22,
            }}
          >
            Phải
          </Box>
        )}
        <Typography
          sx={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#fff',
            fontWeight: 600,
            textShadow: '0 1px 4px #000',
            fontSize: 18,
          }}
        >
          Phải
        </Typography>
      </Paper>
    </Box>
  )
}

export default FacePreviewList
