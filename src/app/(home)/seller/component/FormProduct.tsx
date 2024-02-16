'use client'

import { Products } from '@/app/model/products'
import { FormEvent, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { deleteProduct, updateProduct } from '@/app/api/products/products'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

const FormProduct = ({
  id,
  name,
  description,
  price,
  file,
  category,
  user,
}: Products) => {
  const [productName, setProductName] = useState<string | undefined>(name ?? '')
  const [productDescription, setProductDescription] = useState<
    string | undefined
  >(description ?? '')
  const [productPrice, setProductPrice] = useState<string | undefined>(
    price ?? ''
  )
  const [productFile, setProductFile] = useState<string | undefined>(file ?? '')
  const [productCategory, setProductCategory] = useState<string | undefined>(
    category ?? ''
  )

  const handleOnSubmit = async () => {
    const updatedProduct = {
      id,
      user: user,
      name: productName,
      description: productDescription,
      price: productPrice,
      file: productFile,
      category: productCategory,
    }

    await updateProduct(updatedProduct)
    location.reload()

  }

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    location.reload()
  }

  return (
    <div>
      <Card key={id} style={{ margin: 8 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '6% 6% 0% 6%',
          }}
        >
          <Button
            variant="destructive"
            onClick={() => {
              handleDeleteProduct(id ?? '')
            }}
          >
            <Trash2 />
          </Button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <Input
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value)
              }}
            />
            <CardTitle>Description</CardTitle>
            <Textarea
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value)
              }}
            />
          </CardHeader>
          <CardContent>
            <CardTitle>Price</CardTitle>
            <Input
              type="number"
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value)
              }}
            />
          </CardContent>
          <CardContent>
            <CardTitle>Image</CardTitle>
            {productFile && productDescription ? (
              <Image
                style={{
                  margin: '6% 0 6% 0',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  borderRadius: 6,
                }}
                height={200}
                width={300}
                src={productFile}
                alt={productDescription}
              />
            ) : (
              <span>Image non disponible</span>
            )}
            <Input
              type="file"
              onChange={(e) => {
                setProductFile(e.target.value)
              }}
            />
          </CardContent>
          <CardContent>
            <CardTitle>Category</CardTitle>
            <Input
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value)
              }}
            />
          </CardContent>
          <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button>Update</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

export default FormProduct
