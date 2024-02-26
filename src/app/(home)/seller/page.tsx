'use client'

import AddProduct from '@/app/(home)/seller/component/AddProduct'
import Product from './component/Product'

const HomeSeller = () => {
  return (
    <div
      style={{
        padding: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>
        Bienvenue dans la partie Produit
      </h1>
      <div>
        <AddProduct />
      </div>
      <div>
        <Product />
      </div>
    </div>
  )
}

export default HomeSeller
