import React from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Avatar,
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useSearch } from '@tanstack/react-router';


const returnedItems = [
  { id: 1, name: 'Tên sản phẩm', code: 'SP0060325', uom: 'cái', quantity: 2, price: 240000 },
  { id: 2, name: 'Tên sản phẩm', code: 'SP0060325', uom: 'cái', quantity: 2, price: 240000 },
  { id: 3, name: 'Tên sản phẩm', code: 'SP0060325', uom: 'cái', quantity: 2, price: 240000 },
  { id: 4, name: 'Tên sản phẩm', code: 'SP0060325', uom: 'cái', quantity: 2, price: 240000 },
];

const exchangeItems = [
    { id: 1, name: 'Tên sản phẩm', code: 'SP0060325', uom: 'cái', quantity: 2, price: 240000 },
    { id: 2, name: 'Tên sản phẩm', code: 'SP0060325', uom: 'cái', quantity: 2, price: 240000 },
];

const productsToChoose = Array(6).fill({
    name: 'Tên sản phẩm',
    price: 240000,
    uom: 'cái',
    stock: 20,
    img: 'https://via.placeholder.com/150'
});

const paymentMethods = [
    { name: 'Cash', selected: true, icon: null },
    { name: 'VISA', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-visa-3-226460.png' },
    { name: 'Pay', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-apple-pay-7-739949.png' },
    { name: 'Alipay', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-alipay-8-722581.png' },
    { name: 'JCB', icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/jcb-3-722531.png' },
    { name: 'MasterCard', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3-226458.png' },
    { name: 'PayPal', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-paypal-3-226462.png' }
];

const QuantityInput: React.FC<{ value: number }> = ({ value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
    <IconButton size="small"><RemoveIcon fontSize="inherit" /></IconButton>
    <Typography sx={{ px: 1, minWidth: '20px', textAlign: 'center' }}>{value}</Typography>
    <IconButton size="small"><AddIcon fontSize="inherit" /></IconButton>
  </Box>
);

const ProductTable: React.FC<{title: string, data: any[]}> = ({title, data}) => (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ mb: 1, fontSize: '1rem', fontWeight: 600 }}>{title}</Typography>
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ '& .MuiTableCell-root': { color: 'black', border: 0, pb: 1.5 } }}>
                        <TableCell padding="checkbox"><Checkbox size="small"/></TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>Quality</TableCell>
                        <TableCell>Bonus Gift</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id} sx={{ '& .MuiTableCell-root': { border: 0, py: 0.5 } }}>
                            <TableCell padding="checkbox"><Checkbox size="small"/></TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton size="small" sx={{ mr: 1 }}><DeleteIcon fontSize="inherit" /></IconButton>
                                    <Box sx={{ width: 32, height: 32, bgcolor: '#e0f7fa', borderRadius: '4px', mr: 1.5 }}/>
                                    <Box>
                                        <Typography sx={{fontSize: '0.875rem', fontWeight: 500}}>{item.name}</Typography>
                                        <Typography sx={{fontSize: '0.75rem', color: '#6b7280'}}>Item Code: {item.code}</Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{item.uom}</TableCell>
                            <TableCell><Checkbox size="small"/></TableCell>
                            <TableCell><Checkbox size="small"/></TableCell>
                            <TableCell><QuantityInput value={item.quantity} /></TableCell>
                            <TableCell>VND {item.price.toLocaleString()}</TableCell>
                            <TableCell>VND {(item.price * item.quantity).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
)

const TraHangPage = () => {
  const { invoiceId } = useSearch({ from: '/trahang' });
  const displayInvoiceId = invoiceId || 'HD111111'; // Default fallback
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top App Bar */}
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                placeholder="Search..."
                size="small"
                sx={{ width: 300 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                />
                <Button variant="contained" sx={{bgcolor: '#e5e7eb', color: 'black', '&:hover': {bgcolor: '#d1d5db'}, boxShadow: 'none'}}>Trả hàng 1</Button>
            </Box>
            <Avatar sx={{ width: 32, height: 32 }} />
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flexGrow: 1, p: 1.5, gap: 1.5 }}>
          {/* Main Content */}
          <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{p: '6px 12px', bgcolor: '#e0f2fe', color: 'black', borderRadius: '8px', display: 'inline-block' }}>
                        <Typography variant="subtitle2" fontWeight="bold">{displayInvoiceId}</Typography>
                    </Box>
                    <TextField
                        placeholder="Search by Item, code, serial..."
                        size="small"
                        sx={{ width: 350, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                    />
                </Box>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ '& .MuiTableCell-root': { color: 'black', border: 0, pb: 1.5 } }}>
                                <TableCell padding="checkbox"><Checkbox size="small"/></TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>UOM</TableCell>
                                <TableCell>Quality</TableCell>
                                <TableCell>Bonus Gift</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {returnedItems.map((item) => (
                                <TableRow key={item.id} sx={{ '& .MuiTableCell-root': { border: 0, py: 0.5 } }}>
                                    <TableCell padding="checkbox"><Checkbox size="small"/></TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton size="small" sx={{ mr: 1 }}><DeleteIcon fontSize="inherit" /></IconButton>
                                            <Box sx={{ width: 32, height: 32, bgcolor: '#e0f7fa', borderRadius: '4px', mr: 1.5 }}/>
                                            <Box>
                                                <Typography sx={{fontSize: '0.875rem', fontWeight: 500}}>{item.name}</Typography>
                                                <Typography sx={{fontSize: '0.75rem', color: '#6b7280'}}>Item Code: {item.code}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{item.uom}</TableCell>
                                    <TableCell><Checkbox size="small"/></TableCell>
                                    <TableCell><Checkbox size="small"/></TableCell>
                                    <TableCell><QuantityInput value={item.quantity} /></TableCell>
                                    <TableCell>VND {item.price.toLocaleString()}</TableCell>
                                    <TableCell>VND {(item.price * item.quantity).toLocaleString()}</TableCell>
                                 </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              </Paper>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <ProductTable title="Danh sách hàng đổi" data={exchangeItems} />

            {/* Product Selection */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>Chọn hàng đổi</Typography>
                <Box>
                  <TextField 
                    size="small" 
                    placeholder="Search by item, code, serial..." 
                    sx={{mr: 1}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small"/>
                            </InputAdornment>
                        ),
                    }}
                  />
                  <IconButton><FilterListIcon /></IconButton>
                </Box>
              </Box>
              <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: 2
              }}>
                {productsToChoose.map((product, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 1, borderRadius: '8px', position: 'relative' }}>
                       <Box sx={{ position: 'absolute', top: 4, left: 4, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', px: '6px', borderRadius: '4px', fontSize: '0.75rem' }}>{product.stock}</Box>
                       <Box sx={{ width: '100%', height: 80, bgcolor: '#e0f7fa', borderRadius: '4px', mb: 1 }} />
                       <Typography sx={{fontSize: '0.875rem', fontWeight: 500}}>{product.name}</Typography>
                       <Typography sx={{fontSize: '0.875rem', fontWeight: 600}}>VND {product.price.toLocaleString()} /{product.uom}</Typography>
                    </Paper>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Right Sidebar */}
          <Paper sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', borderRadius: '8px', maxHeight: 'calc(100vh - 80px)'}}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                        <Typography sx={{fontWeight: 500}}>Customer: Ngọc Nguyễn</Typography>
                        <Typography variant="body2" color="text.secondary">CustomerID: 0345405317</Typography>
                    </Box>
                    <Box sx={{textAlign: 'right'}}>
                        <Typography variant="body2" color="text.secondary">06/07/2025 15:14</Typography>
                        <Typography sx={{fontWeight: 500, color: '#1d4ed8'}}>Điểm thưởng: 12,000 điểm</Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }}/>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">Tổng giá gốc đơn hàng</Typography><Typography variant="body2">50,000</Typography></Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">Tổng giá hàng trả</Typography><Typography variant="body2">10,000</Typography></Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">Tổng giá hàng đổi</Typography><Typography variant="body2">5,000</Typography></Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">Số tiền chênh lệch</Typography><Typography variant="body2">5,000</Typography></Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">Phí trả hàng</Typography><Typography variant="body2">0</Typography></Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography variant="body2">Điểm quy đổi</Typography><Typography variant="body2">0</Typography></Box>
                <Divider sx={{ my: 2 }}/>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{fontWeight: 600}}>Grand Total</Typography>
                    <Typography variant="h5" sx={{fontWeight: 600}}>VND 45,000</Typography>
                </Box>
                
                <Typography variant="subtitle2" sx={{fontWeight: 600, mb: 1}}>Payment Method</Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                    {paymentMethods.map(method => (
                        <Button
                            key={method.name}
                            variant={method.selected ? "contained" : "outlined"}
                            size="small"
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: '80px',
                                height: '40px',
                                textTransform: 'none',
                                p: 0,
                            }}
                        >
                            {method.icon ?
                                <img src={method.icon} alt={method.name} style={{ height: '20px', objectFit: 'contain' }} /> :
                                <Typography variant="button">{method.name}</Typography>
                            }
                        </Button>
                    ))}
                </Box>
                
                <Divider sx={{ my: 2 }}/>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography>Khách đưa</Typography><Typography>100,000</Typography></Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography>Trả khách</Typography><Typography>55,000</Typography></Box>
            </Box>

            <Box sx={{ mt: 'auto' }}>
                <TextField fullWidth multiline rows={2} variant="outlined" placeholder="Note" InputProps={{ startAdornment: <InputAdornment position="start"><EditIcon /></InputAdornment> }}/>
                <Button fullWidth variant="contained" size="large" sx={{ mt: 2, py: 1.5, bgcolor: '#d1d5db', '&:hover': {bgcolor: '#9ca3af'} }}>TRẢ HÀNG</Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default TraHangPage;