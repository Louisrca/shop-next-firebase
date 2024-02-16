'use client'

import Product from './component/Product'

const HomeClient = () => {
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
        <Product />
      </div>
    </div>
  )
}

export default HomeClient
