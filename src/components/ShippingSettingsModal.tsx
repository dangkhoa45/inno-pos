import React from 'react';
import {
    Modal,
    Box,
    Paper,
    Typography,
    IconButton,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Switch,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    TextField,
    Button,
    Checkbox,
    Link,
    Menu,
    ListItem,
} from '@mui/material';
import {
    Close as CloseIcon,
    MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';

interface ShippingSettingsModalProps {
    open: boolean;
    onClose: () => void;
}

const shippingPartners = [
    { name: 'J&T', logo: 'https://cdn.jtexpress.vn/sites/default/files/logo-web_0.png' },
    { name: 'VNPost', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-VNPost-Vietnam-Post.png' },
    { name: 'EMS', logo: 'https://vnta.gov.vn/pic/Logo/ems-logo.jpg' },
    { name: 'Grab', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-Grab-Transparent.png' },
    { name: 'SPX Express', logo: 'https://deo.shopeemobile.com/shopee/shopee-spx-track-id/static/media/logo-spx.a3c21d99.svg' },
    { name: 'AhaMove', logo: 'https://media.loveitopcdn.com/3807/logo-ahamove-2.png' },
    { name: 'Giao Hàng Nhanh', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png' },
    { name: 'Viettel Post', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-Viettel-Post-Transparent.png' },
    { name: 'BEST', logo: 'https://best-inc.vn/wp-content/uploads/2023/07/logo-best-express-update.jpg' },
    { name: 'BE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Logo_be.svg/1200px-Logo_be.svg.png' },
    { name: 'Xanh SM', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Logo_Xanh_SM.svg' },
    { name: 'NinjaVan', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Ninja-Van.png' },
];

const ShippingSettingsModal: React.FC<ShippingSettingsModalProps> = ({ open, onClose }) => {
    const [activeSetting, setActiveSetting] = React.useState('general');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{
                    width: '900px',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Thiết lập vận chuyển</Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ display: 'flex', flexGrow: 1, overflowY: 'auto' }}>
                        {/* Left Nav */}
                        <Box sx={{ width: '240px', borderRight: '1px solid #e0e0e0', pt: 2, bgcolor: '#f7f7f7' }}>
                            <List component="nav" sx={{ '& .MuiListItemButton-root': { py: 1.2, px: 2 }, '& .Mui-selected': { bgcolor: '#e8f0fe !important', color: 'primary.main', borderRight: '3px solid #1976d2' } }}>
                                <ListItemButton
                                    selected={activeSetting === 'general'}
                                    onClick={() => setActiveSetting('general')}
                                >
                                    <ListItemText primary="Thiết lập chung" primaryTypographyProps={{ fontWeight: 500 }} />
                                </ListItemButton>
                                <ListItemButton
                                    selected={activeSetting === 'partners'}
                                    onClick={() => setActiveSetting('partners')}
                                >
                                    <ListItemText primary="Đối tác vận chuyển" primaryTypographyProps={{ fontWeight: 500 }} />
                                </ListItemButton>
                            </List>
                        </Box>

                        {/* Right Content */}
                        <Box sx={{ flex: 1, p: '24px 32px', display: 'flex', flexDirection: 'column' }}>
                            {activeSetting === 'general' && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: 500 }}>Đối soát nhanh</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Thanh toán tiền COD ngay khi đơn hàng được giao thành công. <Link href="#" underline="none">Tìm hiểu thêm</Link>
                                            </Typography>
                                        </Box>
                                        <Switch />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontWeight: 500 }}>Khai giá</Typography>
                                        <Switch />
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ width: '200px', fontWeight: 500, flexShrink: 0 }}>Người trả phí</Typography>
                                        <RadioGroup row defaultValue="sender">
                                            <FormControlLabel value="sender" control={<Radio />} label="Người gửi" />
                                            <FormControlLabel value="receiver" control={<Radio />} label="Người nhận" />
                                        </RadioGroup>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography sx={{ width: '180px', fontWeight: 500, flexShrink: 0 }}>Lưu ý giao hàng</Typography>
                                        <Select fullWidth variant="standard" defaultValue="no-view">
                                            <MenuItem value="no-view">Không cho xem hàng</MenuItem>
                                            <MenuItem value="can-view">Cho xem hàng</MenuItem>
                                        </Select>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography sx={{ width: '180px', fontWeight: 500, flexShrink: 0 }}>Ghi chú cho bưu tá</Typography>
                                        <TextField fullWidth variant="standard" placeholder="Nhập ghi chú" />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography sx={{ width: '180px', fontWeight: 500, flexShrink: 0 }}>Trọng lượng & Kích thước</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                                            <TextField variant="standard" defaultValue="500" sx={{ width: '50px' }} /> 
                                            <Select variant="standard" defaultValue="g"><MenuItem value="g">gram</MenuItem></Select>
                                            <TextField variant="standard" defaultValue="10" sx={{ width: '35px', '.MuiInput-input': {textAlign: 'center'} }}/> x
                                            <TextField variant="standard" defaultValue="10" sx={{ width: '35px', '.MuiInput-input': {textAlign: 'center'} }}/> x
                                            <TextField variant="standard" defaultValue="10" sx={{ width: '35px', '.MuiInput-input': {textAlign: 'center'} }}/>
                                            <Select variant="standard" defaultValue="cm"><MenuItem value="cm">cm</MenuItem></Select>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography sx={{ width: '180px', fontWeight: 500, flexShrink: 0 }}>Dịch vụ mặc định</Typography>
                                        <Select fullWidth variant="standard" defaultValue="" displayEmpty>
                                            <MenuItem value="" disabled>Chọn dịch vụ</MenuItem>
                                            <MenuItem value="fast">Giao nhanh</MenuItem>
                                            <MenuItem value="standard">Giao thường</MenuItem>
                                        </Select>
                                    </Box>
                                    <Box sx={{ flexGrow: 1}} />
                                </Box>
                            )}
                            {activeSetting === 'partners' && (
                            <List sx={{ width: '100%'}}>
                                    {shippingPartners.map((partner) => (
                                        <ListItem
                                            key={partner.name}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="options" onClick={handleMenuClick}>
                                                    <MoreHorizIcon />
                                                </IconButton>
                                            }
                                        >
                                            <Box sx={{ width: '40px', height: '40px', mr: 2, display: 'flex', alignItems: 'center' }}>
                                                <img src={partner.logo} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                            </Box>
                                            <ListItemText primary={partner.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    </Box>
                    
                    {/* Footer */}
                    <Box sx={{ p: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0' }}>
                        <FormControlLabel control={<Checkbox />} label={<Typography variant="body2">Áp dụng thiết lập cho tất cả tài khoản của gian hàng</Typography>} />
                        <Box>
                            <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>Bỏ qua</Button>
                            <Button variant="contained" onClick={onClose}>Lưu</Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                    mt: 1,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleMenuClose}>Tắt hãng này</MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default ShippingSettingsModal; 