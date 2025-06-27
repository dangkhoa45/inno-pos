import React from 'react'

import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Link, Modal, Typography } from '@mui/material'

interface ImportFileModalProps {
  open: boolean
  onClose: () => void
}

const ImportFileModal: React.FC<ImportFileModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="import-file-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90vw', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            id="import-file-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: '600' }}
          >
            Nhập danh sách trả hàng từ file excel
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Xử lý dữ liệu (
            <Link
              href="#"
              underline="always"
              sx={{ color: 'primary.main', fontWeight: '500' }}
            >
              Tải về file mẫu
            </Link>
            )
          </Typography>
          <Box>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ fontWeight: '600', mb: 1 }}
            >
              Lưu ý:
            </Typography>
            <Typography variant="body2" component="p" color="text.secondary">
              Trong mỗi lần import, hệ thống hỗ trợ tối đa 19 trang tính
              (sheet), mỗi trang tính tương đương một giao dịch và có tối đa 250
              dòng.
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" component="label">
            Chọn file
            <input type="file" hidden />
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ImportFileModal
