import React from 'react'

import { WarningAmberRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

interface FaceInstructionsProps {
  instructions: string[]
}

const FaceInstructions: React.FC<FaceInstructionsProps> = ({
  instructions,
}) => (
  <Box sx={{ mt: 1 }}>
    {instructions.map((ins, idx) => (
      <Box
        key={idx}
        sx={{
          background: '#e3f1ff',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          mb: 2,
        }}
      >
        <WarningAmberRounded
          sx={{ color: '#1976d2', mr: 2, fontSize: 22 }}
          fontSize="small"
        />
        <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{ins}</Typography>
      </Box>
    ))}
  </Box>
)

export default FaceInstructions
