import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

import type { OrderData } from './OrderContext'

interface OrdersContextType {
  orders: OrderData[]
  addOrder: (order: OrderData) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export const useOrders = () => {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}

interface OrdersProviderProps {
  children: ReactNode
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<OrderData[]>(() => {
    try {
      const savedOrders = localStorage.getItem('orders')
      return savedOrders ? JSON.parse(savedOrders) : []
    } catch (error) {
      console.error('Failed to parse orders from localStorage', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders))
    } catch (error) {
      console.error('Failed to save orders to localStorage', error)
    }
  }, [orders])

  const addOrder = (order: OrderData) => {
    setOrders((prevOrders) => [order, ...prevOrders])
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  )
} 