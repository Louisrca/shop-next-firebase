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
import { Frown, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/card/CardProvider'
import { v4 } from 'uuid'

export function DropDownBasket() {
  const { cart, removeFromCart } = useCart()

  const basketData = cart

  const totalPrice = basketData.reduce((acc, basket) => {
    const price =
      typeof basket.price === 'number'
        ? basket.price
        : parseFloat(basket.price || '0')
    return acc + price
  }, 0)

  const uuid = v4()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ShoppingCart />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          maxHeight: 500,
          overflow: 'auto',
          marginRight: 20,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            background: '#fff',
          }}
        >
          <DropdownMenuLabel>Mon Panier</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </div>
        {basketData && basketData.length > 0 ? (
          basketData.map((basket: Products) => (
            <div
              key={basket.id + uuid}
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 8,
              }}
            >
              <div style={{ margin: 2 }}>
                <span>{basket.name}</span>
              </div>{' '}
              <div style={{ margin: 2 }}>
                <span>: {basket.price} €</span>{' '}
              </div>
              <div style={{ margin: '0 2px 0 6px' }}>
                <Button onClick={() => removeFromCart(basket.id ?? '')}>
                  -
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span style={{ margin: '0 2% 0 2%' }}>Aucun produit</span>
            <Frown />
          </div>
        )}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            width: '100%',
            background: '#fff',
          }}
        >
          <DropdownMenuSeparator />{' '}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <DropdownMenuLabel>Total :</DropdownMenuLabel>{' '}
            <span style={{ fontSize: 14 }}>{totalPrice} €</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
