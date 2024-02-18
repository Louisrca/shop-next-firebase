import React from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useCart } from '@/context/card/CardProvider'
import { ShoppingBag } from 'lucide-react'

import { Products } from '@/app/model/products'

interface AddToCartProps {
  addToCartAction: (id: string) => Promise<Products | undefined>
  id: string
  toastDescription: string
  toastTitle: string
}

const AddToCart: React.FC<AddToCartProps> = ({
  addToCartAction,
  id,
  toastDescription,
  toastTitle,
}) => {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    try {
      const product = await addToCartAction(id)
      if (product !== undefined) addToCart(product)
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error)
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Button
        style={{ width: '100%' }}
        onClick={() => {
          handleAddToCart()
          toast({
            title: `Le produit ${toastTitle} a bien été ajouté au panier.`,
            description: `${toastDescription}`,
          })
        }}
      >
        <span style={{ margin: '0 2% 0 2%' }}>Ajout Rapide</span>
        <ShoppingBag />
      </Button>
    </div>
  )
}

export default AddToCart
