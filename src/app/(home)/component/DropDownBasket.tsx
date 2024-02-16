'use client'
import { Products } from '@/app/model/products'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/card/CardProvider'

export function DropDownBasket() {
  const { cart } = useCart()

  const basketData = cart

  console.log(basketData)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ShoppingCart />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {basketData && basketData.length > 0 ? (
          basketData.map((basket: Products) => (
            <div
              key={basket.id}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <p>{basket.name}</p> <p>: {basket.price} €</p>
            </div>
          ))
        ) : (
          <div>Aucun produit</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
