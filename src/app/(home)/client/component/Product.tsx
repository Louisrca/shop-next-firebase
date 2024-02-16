'use client'

import { Products } from '@/app/model/products'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../api/products/products'
import s from './style.module.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

import AddToCart from './AddToCard'

const Product = () => {
  const [products, setProducts] = useState<Products[]>([])
  const [productsCart, setProductsCart] = useState<Products>()

  const addToCartAction = async (id: string) => {
    const selectedProduct = products.find((product) => product.id === id)

    if (selectedProduct) {
      setProductsCart(selectedProduct)

      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      cart.push(selectedProduct)

      localStorage.setItem('cart', JSON.stringify(cart))

      return cart
    }

    return undefined
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProducts()
      setProducts(productData)
    }
    fetchProduct()
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Tous les produits</h1>
      <div className={s.formProduct}>
        {products.length <= 0 ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              style={{
                width: 300,
                margin: '0 0 6% 0',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent style={{ padding: '0 0 0 0', flex: 1 }}>
                {product.file && product.description ? (
                  <Image
                    style={{
                      margin: '0 0 6% 0',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '6px 6px 0 0',
                    }}
                    height={100}
                    width={300}
                    sizes={'100vw'}
                    src={product.file}
                    alt={product.description}
                  />
                ) : (
                  <span>Image non disponible</span>
                )}
              </CardContent>

              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p>{product.price} €</p>
              </CardContent>

              <CardContent
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AddToCart
                  addToCartAction={() => addToCartAction(product.id ?? '')}
                  id={product.id ?? ''}
                  toastDescription={product.name ?? ''}
                  toastTitle={product.description ?? ''}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Product
