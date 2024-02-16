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
