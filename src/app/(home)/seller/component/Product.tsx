'use client'

import { Products } from '@/app/model/products'
import { useEffect, useState } from 'react'
import { getProductsByUser } from '../../../api/products/products'
import s from './style.module.css'
import FormProduct from './FormProduct'
import { useAuth } from '@/context/AuthUserProvider'

const Product = () => {
  const [products, setProducts] = useState<Products[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      const userID = user?.uid
      const productData = await getProductsByUser(userID)
      setProducts(productData)
    }

    fetchProduct()
  }, [])

  return (
    <div className="flex flex-col">
      <h2 className="my-5 text-xl font-bold">Tous les produits</h2>
      <div className={s.formProduct}>
        {products.length <= 0 ? (
          <p>Aucun produit inseré !</p>
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
