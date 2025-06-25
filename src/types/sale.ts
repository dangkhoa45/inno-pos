export interface Product {
  id: string
  name: string
  price: number
  itemCode?: string
  image?: string
  stock: number
  category: string
  group?: string
  brand?: string
  color?: string[]
  material?: string[]
  spec?: string[]
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  totalPurchases: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customerId?: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  createdAt: Date
  status: 'pending' | 'completed' | 'cancelled'
}
