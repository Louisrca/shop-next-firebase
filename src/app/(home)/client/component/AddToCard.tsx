'use client'
import { type Products } from '@/app/model/products'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/card/CardProvider'
import { ShoppingBag } from 'lucide-react'

interface AddToCartProps {
  addToCartAction: (product: Products) => Promise<Products>
  currentProduct: Products | null
}

const AddToCart: React.FC<AddToCartProps> = ({
  addToCartAction,
  currentProduct,
}) => {
    const { addToCart } = useCart()

    return (
        <Button
            onClick={async () => {
                const product = await addToCartAction(currentProduct ?? {})
                addToCart(product)
            }}
        >
            <ShoppingBag />
        </Button>
    )
}

export default AddToCart
