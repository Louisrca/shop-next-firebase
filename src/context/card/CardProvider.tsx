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
    console.log(
      'Chargement du panier depuis localStorage',
      storedCart ? JSON.parse(storedCart) : 'Aucun panier'
    )
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Products) => {
    setCart((prevCart) => [...prevCart, product])
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
