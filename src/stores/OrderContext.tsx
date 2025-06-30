import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { CartItem, Customer } from '../types/sale'

export interface OrderData {
  customer: Customer | null
  cartItems: CartItem[]
  subtotal: number
  discount: number
  discountType: 'percent' | 'amount'
  discountAmount: number
  vatAmount: number
  redeemPoints: number
  totalAmount: number
  totalQuantity: number
  selectedPaymentMethod?: string
  orderId?: string
  timestamp?: string
  notes?: string
}

interface OrderContextType {
  orderData: OrderData | null
  setOrderData: (data: OrderData) => void
  clearOrderData: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

interface OrderProviderProps {
  children: ReactNode
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orderData, setOrderDataState] = useState<OrderData | null>(null)

  const setOrderData = (data: OrderData) => {
    setOrderDataState(data)
  }

  const clearOrderData = () => {
    setOrderDataState(null)
  }

  return (
    <OrderContext.Provider value={{ orderData, setOrderData, clearOrderData }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
