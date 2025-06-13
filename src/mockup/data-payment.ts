// Mock data for payment components
export interface PaymentMethod {
  id: string
  name: string
  type: 'cash' | 'card' | 'qr' | 'bank_transfer'
  defaultAmount?: number
  enabled: boolean
}

export interface OrderItem {
  id: string
  name: string
  itemCode: string
  quantity: number
  unitPrice: number
  amount: number
  image?: string
}

export interface OrderData {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  items: OrderItem[]
  totalQuantity: number
  netTotal: number
  discountAmount: number
  grandTotal: number
  createdAt: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Tiền mặt',
    type: 'cash',
    enabled: true,
  },
  {
    id: 'card',
    name: 'Thẻ tín dụng',
    type: 'card',
    enabled: true,
  },
  {
    id: 'bank_transfer',
    name: 'Chuyển khoản ngân hàng',
    type: 'bank_transfer',
    enabled: true,
  },
  {
    id: 'qr_code',
    name: 'Thanh toán QR',
    type: 'qr',
    enabled: true,
  },
]

export const mockPaymentAmounts: number[] = [250000, 300000, 400000, 500000]

export const mockOrderData: OrderData = {
  id: 'ORDER-2025-05586',
  customerId: 'CUST-2025-05585',
  customerName: 'Nguyễn Văn An',
  customerPhone: '0909693692',
  items: [
    {
      id: '1',
      name: 'ÁO JOKER MLTE15-trang-l',
      itemCode: 'SP0080335',
      quantity: 1,
      unitPrice: 240000,
      amount: 240000,
      image: '/api/placeholder/40/40',
    },
    {
      id: '2',
      name: 'ÁO JOKER MLTE15-trang-xl',
      itemCode: 'SP0080328',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
      image: '/api/placeholder/40/40',
    },
    {
      id: '3',
      name: 'ÁO JOKER MLTE15-trang-m',
      itemCode: 'SP0080345',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
      image: '/api/placeholder/40/40',
    },
  ],
  totalQuantity: 3,
  netTotal: 240000,
  discountAmount: 0,
  grandTotal: 240000,
  createdAt: '2025-06-13T10:30:00Z',
  status: 'pending',
}

export const mockCustomerData = {
  id: 'CUST-2025-05585',
  name: 'Nguyễn Văn An',
  phone: '0909693692',
  email: 'nguyenvanan@email.com',
  address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
  type: 'regular' as const,
  discount: 0,
}
