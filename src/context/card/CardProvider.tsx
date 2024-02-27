'use client'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Products } from '@/app/model/products'

interface CartContextType {
  cart: Products[]
  addToCart: (product: Products) => void
  removeFromCart: (productId: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Products[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')

    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const addToCart = (product: Products) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : []
      return [...cartArray, product]
    })
  }

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter(
      (product) => product.productId !== productId
    )

    setCart(updatedCart)

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    return updatedCart
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
