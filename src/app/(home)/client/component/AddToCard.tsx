'use client'
import { type Products } from '@/app/model/products'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useCart } from '@/context/card/CardProvider'
import { ToastAction } from '@radix-ui/react-toast'
import { ShoppingBag } from 'lucide-react'

interface AddToCartProps {
  addToCartAction: (id: string) => void
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
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Button
        style={{ width: '100%' }}
        onClick={() => {
          toast({
            title: `Le produit ${toastTitle} a bien été ajouté dans le panier`,
            description: `Description du produit : ${toastDescription} `,
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
          const product = addToCartAction(id)
          if (product !== undefined) addToCart(product)
        }}
      >
        <span style={{ margin: '0 2% 0 2%' }}>Ajout Rapide</span>
        <ShoppingBag />
      </Button>
    </div>
  )
}

export default AddToCart
