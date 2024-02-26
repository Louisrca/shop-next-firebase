'use client'

import { Products } from '@/app/model/products'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../api/products/products'
import s from './style.module.css'
import FormProduct from './FormProduct'

const Product = () => {
  const [products, setProducts] = useState<Products[]>([])

  console.log('🚀 ~ Product ~ product:', products)

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProducts()
      setProducts(productData)
    }

    fetchProduct()
  }, [])

  return (
    <div className="flex flex-col">
      <h2 className="my-5 text-xl font-bold">Tous les produits</h2>
      <div className={s.formProduct}>
        {products.length <= 0 ? (
          <p>Chargement...</p>
        ) : (
          products.map((product) => (
            <FormProduct
              key={product.id ?? ''}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              file={product.file}
              category={product.category}
              user={product.user}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Product
