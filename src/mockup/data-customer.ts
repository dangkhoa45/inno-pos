// Mock data for customers
export interface Customer {
  id: string
  customerCode?: string
  name: string
  phone: string
  email?: string
  address?: string
  type: 'regular' | 'vip' | 'wholesale'
  totalOrders: number
  totalSpent: number
  totalPurchases: number
  discount: number
  status: 'active' | 'inactive'
  createdAt: string
  lastOrderAt?: string
  avatar?: string
}

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-2025-05585',
    customerCode: 'CUST-2025-05585',
    name: 'Nguyễn Văn An',
    phone: '0909693692',
    email: 'nguyenvanan@email.com',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    type: 'regular',
    totalOrders: 12,
    totalSpent: 2400000,
    totalPurchases: 12,
    discount: 0,
    status: 'active',
    createdAt: '2024-01-15T08:30:00Z',
    lastOrderAt: '2025-06-10T14:20:00Z',
  },
  {
    id: 'CUST-2025-05586',
    customerCode: 'CUST-2025-05586',
    name: 'Trần Thị Bình',
    phone: '0908123456',
    email: 'tranthibinh@email.com',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    type: 'vip',
    totalOrders: 28,
    totalSpent: 5600000,
    totalPurchases: 28,
    discount: 5,
    status: 'active',
    createdAt: '2023-08-20T10:15:00Z',
    lastOrderAt: '2025-06-12T16:45:00Z',
  },
  {
    id: 'CUST-2025-05587',
    customerCode: 'CUST-2025-05587',
    name: 'Lê Minh Châu',
    phone: '0907987654',
    email: 'leminhchau@email.com',
    address: '789 Võ Văn Tần, Quận 3, TP.HCM',
    type: 'wholesale',
    totalOrders: 45,
    totalSpent: 12300000,
    totalPurchases: 45,
    discount: 10,
    status: 'active',
    createdAt: '2023-03-10T09:00:00Z',
    lastOrderAt: '2025-06-11T11:30:00Z',
  },
  {
    id: 'CUST-2025-05588',
    customerCode: 'CUST-2025-05588',
    name: 'Phạm Văn Đức',
    phone: '0906555777',
    email: 'phamvanduc@email.com',
    address: '321 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
    type: 'regular',
    totalOrders: 8,
    totalSpent: 1600000,
    totalPurchases: 8,
    discount: 0,
    status: 'active',
    createdAt: '2024-05-22T15:45:00Z',
    lastOrderAt: '2025-06-08T12:15:00Z',
  },
  {
    id: 'CUST-2025-05589',
    customerCode: 'CUST-2025-05589',
    name: 'Hoàng Thị Em',
    phone: '0905444888',
    email: 'hoangthiem@email.com',
    address: '654 Cách Mạng Tháng Tám, Quận 10, TP.HCM',
    type: 'vip',
    totalOrders: 35,
    totalSpent: 8900000,
    totalPurchases: 35,
    discount: 8,
    status: 'active',
    createdAt: '2023-11-08T13:20:00Z',
    lastOrderAt: '2025-06-09T17:30:00Z',
  },
]

// Helper functions
export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find((customer) => customer.id === id)
}

export const getCustomerByPhone = (phone: string): Customer | undefined => {
  return mockCustomers.find((customer) => customer.phone === phone)
}

export const searchCustomers = (query: string): Customer[] => {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return mockCustomers

  return mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm)),
  )
}
