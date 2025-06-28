import React from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Tabs,
    Tab,
    Divider,
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Edit as EditIcon,
    LocalShippingOutlined as LocalShippingIcon,
    PersonOutline as PersonOutlineIcon,
    Add as AddIcon,
    LocationOnOutlined as LocationOnOutlinedIcon,
    SettingsOutlined as SettingsOutlinedIcon,
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import ShippingSettingsModal from './ShippingSettingsModal';
import AddPartnerModal from './AddPartnerModal';

const DeliveryForm = () => {
    const [selectedTab, setSelectedTab] = React.useState(1);
    const [isSettingsModalOpen, setSettingsModalOpen] = React.useState(false);
    const [isAddPartnerModalOpen, setAddPartnerModalOpen] = React.useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Paper elevation={0} sx={{
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px 0 0 8px',
            height: '100%',
            width: '100%',
        }}>
            {/* Form Fields */}
            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        bgcolor: '#eef2f6',
                        borderRadius: '8px',
                        p: 0.5,
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'white',
                            height: '100%',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            zIndex: 0,
                        },
                    }}
                >
                    <Tab
                        icon={<LocalShippingIcon />}
                        iconPosition="start"
                        label="Cổng KiotViet"
                        sx={{ textTransform: 'none', zIndex: 1, color: selectedTab === 0 ? 'primary.main' : 'text.secondary' }}
                    />
                    <Tab
                        icon={<PersonOutlineIcon />}
                        iconPosition="start"
                        label="Tự giao hàng"
                        sx={{ textTransform: 'none', zIndex: 1, color: selectedTab === 1 ? 'primary.main' : 'text.secondary' }}
                    />
                </Tabs>
                
                {selectedTab === 0 && (
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', pt: 2, flexGrow: 1}}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: '12px 16px',
                            border: '1px solid #90caf9',
                            borderRadius: '8px',
                            bgcolor: '#e3f2fd',
                            width: '100%',
                        }}>
                            <LocationOnOutlinedIcon sx={{ color: 'primary.main', fontSize: '1.3rem' }} />
                            <Typography variant="body2" sx={{ flexGrow: 1, color: 'text.secondary', fontSize: '0.85rem' }}>
                                Sau khi nhập đầy đủ địa chỉ, bạn có thể lựa chọn hãng vận chuyển phù hợp với giá tốt nhất
                            </Typography>
                            <SettingsOutlinedIcon 
                                sx={{ color: 'text.secondary', cursor: 'pointer' }} 
                                onClick={() => setSettingsModalOpen(true)}
                            />
                        </Box>
                        <Box sx={{ textAlign: 'center', my: 2, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSniiO-fiPAFNgBw6LJ6nFKmRDwCicnOEzbew&s"
                                alt="KiotViet Promotion"
                                style={{ maxWidth: '90%', height: 'auto', borderRadius: '8px' }}
                            />
                        </Box>
                    </Box>
                )}

                {selectedTab === 1 && (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mt: 1 }}>
                            <Typography variant="body2" sx={{ width: '120px', color: 'text.secondary' }}>Đối tác giao hàng</Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                fullWidth
                                defaultValue="Nguyễn Văn A"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <KeyboardArrowDownIcon sx={{fontSize: '1.2rem'}} />
                                            <EditIcon sx={{ ml: 1.5, fontSize: '1rem' }} />
                                            <AddIcon 
                                                sx={{ ml: 1.5, fontSize: '1.1rem', cursor: 'pointer' }} 
                                                onClick={() => setAddPartnerModalOpen(true)}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                            <Typography variant="body2" sx={{ width: '120px', color: 'text.secondary' }}>Loại dịch vụ</Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                fullWidth
                                defaultValue="Giao thường"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <KeyboardArrowDownIcon sx={{fontSize: '1.2rem'}} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                            <Typography variant="body2" sx={{ width: '120px', color: 'text.secondary' }}>Phí áp dụng</Typography>
                            <TextField variant="standard" size="small" fullWidth />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                            <Typography variant="body2" sx={{ width: '120px', color: 'text.secondary' }}>Mã vận đơn</Typography>
                            <TextField variant="standard" size="small" fullWidth />
                        </Box>
                        
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                                 <Typography variant="body2" sx={{ width: '120px', color: 'text.secondary', pt: 2 }}>Thời gian giao hàng</Typography>
                                <DateTimePicker
                                    defaultValue={dayjs('2025-06-04T14:10')}
                                    sx={{width: '100%'}}
                                    slotProps={{
                                        textField: { variant: 'standard', size: 'small' },
                                    }}
                                    slots={{
                                        openPickerIcon: CalendarIcon,
                                    }}
                                />
                            </Box>
                        </LocalizationProvider>
                    </React.Fragment>
                )}
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: '1px solid #f0f2f5', mt: 'auto' }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        textTransform: 'none',
                        py: 1.2,
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        boxShadow: 'none',
                    }}
                >
                    Đặt hàng
                </Button>
            </Box>
            
            <ShippingSettingsModal open={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
            <AddPartnerModal open={isAddPartnerModalOpen} onClose={() => setAddPartnerModalOpen(false)} />
        </Paper>
    );
}

export default DeliveryForm; 