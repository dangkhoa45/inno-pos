import React from 'react';
import {
    Modal,
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface AddPartnerModalProps {
    open: boolean;
    onClose: () => void;
}

const FormRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <Grid container item xs={12} alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', pr: 2 }}>
                {label}
            </Typography>
        </Grid>
        <Grid item xs={8}>
            {children}
        </Grid>
    </Grid>
);

const AddPartnerModal: React.FC<AddPartnerModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper sx={{
                width: '600px',
                maxWidth: '90vw',
                p: 0,
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '12px 24px', borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Thêm đối tác giao hàng</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Form */}
                <Box sx={{ p: '24px 32px', flexGrow: 1, overflowY: 'auto' }}>
                    <Grid container>
                        <FormRow label="Loại đối tác">
                            <RadioGroup row defaultValue="individual">
                                <FormControlLabel value="individual" control={<Radio />} label="Cá nhân" />
                                <FormControlLabel value="company" control={<Radio />} label="Công ty" />
                            </RadioGroup>
                        </FormRow>
                        <FormRow label="Mã đối tác">
                            <TextField variant="standard" size="small" fullWidth placeholder="Mã mặc định" disabled />
                        </FormRow>
                        <FormRow label="Tên đối tác*">
                            <TextField variant="standard" size="small" fullWidth autoFocus />
                        </FormRow>
                         <FormRow label="Điện thoại">
                            <TextField variant="standard" size="small" fullWidth />
                        </FormRow>
                         <FormRow label="Email">
                            <TextField variant="standard" size="small" fullWidth />
                        </FormRow>
                        <FormRow label="Địa chỉ chi tiết">
                            <TextField variant="standard" size="small" fullWidth placeholder="Số nhà, tòa nhà, ngõ, đường" />
                        </FormRow>
                        <FormRow label="Tỉnh/TP - Quận/Huyện">
                            <TextField variant="standard" size="small" fullWidth />
                        </FormRow>
                         <FormRow label="Phường/Xã">
                            <TextField variant="standard" size="small" fullWidth />
                        </FormRow>
                        <FormRow label="Nhóm đối tác">
                            <TextField variant="standard" size="small" fullWidth placeholder="Chọn nhóm đối tác" />
                        </FormRow>
                         <FormRow label="Ghi chú">
                            <TextField variant="standard" size="small" fullWidth />
                        </FormRow>
                    </Grid>
                </Box>

                 {/* Footer */}
                <Box sx={{ p: '12px 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderTop: '1px solid #e0e0e0', gap: 1 }}>
                    <Button variant="outlined" onClick={onClose}>Bỏ qua</Button>
                    <Button variant="contained" onClick={onClose}>Lưu</Button>
                </Box>
            </Paper>
        </Modal>
    );
};

export default AddPartnerModal; 