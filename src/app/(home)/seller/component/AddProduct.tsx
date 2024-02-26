'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAuth } from '@/context/AuthUserProvider'

import { Products } from '@/app/model/products'

import { createProduct } from '@/app/api/products/products'
import { uploadFile } from '@/lib/uploadFile'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AddProduct = () => {
  const { user } = useAuth()

  const [productData, setProductData] = useState<Products>({
    name: '',
    description: '',
    price: '0',
    category: '',
    file: '',
    user: `/users/${user?.uid}`,
  })

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files || files.length === 0) {
      console.log('No file selected.')
      return
    }

    const file = files[0]

    try {
      const fileUrl = await uploadFile(file)

      setProductData((prevProductData) => ({
        ...prevProductData,
        file: fileUrl,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('toto')

    if (!productData.file) {
      console.log('No file selected.')
      return
    }

    try {
      await createProduct(productData)
      location.reload()
      console.log('Product uploaded successfully', productData)
    } catch (error) {
      console.error('An error occurred during the product upload:', error)
    }
  }

  return (
    <Card style={{ width: 500 }}>
      <CardHeader>
        <CardTitle>Ajouter un nouveau produit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label>Nom du produit</label>
            <Input
              type="text"
              name="name"
              placeholder="Nom du produit"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <Input
              type="text"
              name="description"
              placeholder="Description du produit"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label> Prix</label>
            <Input
              type="number"
              step="any"
              min="0"
              name="price"
              placeholder="Prix"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label> Catégorie</label>
            <Input
              type="text"
              name="category"
              placeholder="Catégorie"
              onChange={handleInputChange}
              required
            />
          </div>
          <Input
            type="file"
            accept='accept="image/jpeg, image/png'
            onChange={handleFileChange}
          />

          <Button variant={'outline'} type="submit">
            Ajouter le produit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddProduct
