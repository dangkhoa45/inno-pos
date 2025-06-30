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
  uom?: string // Unit of Measure (cái, đôi, bộ, etc.)
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

// Payment Method Types
export type SalePaymentMethod =
  | 'cash'
  | 'visa'
  | 'applepay'
  | 'jcb'
  | 'mastercard'
  | 'paypal'
export type ProcessingPaymentMethod =
  | 'cash'
  | 'card'
  | 'bank'
  | 'ewallet'
  | 'points'

export interface PaymentMethodDefinition {
  id: string
  label: string
  icon?: string
  category: ProcessingPaymentMethod
}

// Payment Methods for Sale Page
export const SALE_PAYMENT_METHODS: PaymentMethodDefinition[] = [
  { id: 'cash', label: 'Cash', category: 'cash' },
  { id: 'visa', label: 'Visa', category: 'card' },
  { id: 'applepay', label: 'Apple Pay', category: 'ewallet' },
  { id: 'jcb', label: 'JCB', category: 'card' },
  { id: 'mastercard', label: 'Mastercard', category: 'card' },
  { id: 'paypal', label: 'PayPal', category: 'ewallet' },
]

// Payment Methods for Processing Page
export const PROCESSING_PAYMENT_METHODS: Array<{
  key: ProcessingPaymentMethod
  label: string
  description: string
}> = [
  { key: 'cash', label: 'Cash', description: 'Cash Payment' },
  { key: 'card', label: 'Card', description: 'Credit/Debit Card' },
  { key: 'bank', label: 'Bank Transfer', description: 'Bank Transfer' },
  { key: 'ewallet', label: 'E-wallet', description: 'Digital Wallet' },
  { key: 'points', label: 'Points', description: 'Loyalty Points' },
]

// Mapping function from sale method to processing method
export const mapSaleToProcessingMethod = (
  saleMethod: string,
): ProcessingPaymentMethod => {
  const method = SALE_PAYMENT_METHODS.find((m) => m.id === saleMethod)
  return method?.category || 'cash'
}

// Reverse mapping function
export const mapProcessingToSaleMethod = (
  processingMethod: ProcessingPaymentMethod,
): string => {
  const method = SALE_PAYMENT_METHODS.find(
    (m) => m.category === processingMethod,
  )
  return method?.id || 'cash'
}
