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
import { useEffect, useState } from 'react'

export function DropDownBasket() {
  const [basketData, setBasketData] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      const basket = localStorage.getItem('basket')
      if (basket) {
        setBasketData(JSON.parse(basket))
      } else {
        setBasketData(null)
      }
    }

    fetchData()
  }, [])

  console.log('🚀 ~ DropDownBasket ~ basketData:', basketData)

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
        {basketData ? (
          basketData.map((basket: any) => (
            <div key={basket.id}>{basket.name}</div>
          ))
        ) : (
          <div>Aucun produit</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
