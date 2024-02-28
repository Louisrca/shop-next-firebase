'use client'

import { Products } from '@/app/model/products'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { deleteProduct, updateProduct } from '@/app/api/products/products'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { uploadFile } from '@/lib/uploadFile'

const FormProduct = ({
  id,
  name,
  description,
  price,
  file,
  category,
  user,
}: Products) => {
  const [productName, setProductName] = useState<string | null>(name ?? '')
  const [productDescription, setProductDescription] = useState<string | null>(
    description ?? ''
  )
  const [productPrice, setProductPrice] = useState<string | null>(price ?? '')
  const [productFile, setProductFile] = useState<string | null>(file ?? '')
  const [productCategory, setProductCategory] = useState<string | null>(
    category ?? ''
  )

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const productID = crypto.randomUUID()

    const updatedProduct: Products = {
      id: id,
      user: user,
      name: productName,
      description: productDescription,
      price: productPrice,
      file: productFile,
      category: productCategory,
      productId: productID, // Utilisation de 'productId' au lieu de 'productID'
    }
    await updateProduct(updatedProduct)
    location.reload()
  }

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    location.reload()
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageFile = event.target.files[0]
      setSelectedImage(imageFile)
    }

    const files = event.target.files

    if (!files || files.length === 0) {
      console.log('No file selected.')
      return
    }

    const file = files[0]

    try {
      const fileUrl = await uploadFile(file)

      setProductFile(fileUrl)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Card key={id} style={{ height: '100%', width: 400 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '6% 6% 0% 6%',
          }}
        >
          <Button
            aria-label="Supprimer le produit"
            variant="destructive"
            className="transition duration-500 hover:bg-red-400/75 hover:text-white"
            onClick={() => {
              handleDeleteProduct(id ?? '')
            }}
          >
            <Trash2 />
          </Button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <CardHeader>
            <CardContent>
              <CardTitle>Image</CardTitle>
              {productFile && productDescription ? (
                <Image
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    margin: '6% 0 6% 0',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: '0.5rem',

                    width: '100%',
                  }}
                  height={50}
                  width={300}
                  sizes={'100vw'}
                  src={
                    productFile ??
                    URL.createObjectURL(selectedImage ?? new Blob())
                  }
                  alt={productDescription}
                />
              ) : (
                <span>Image non disponible</span>
              )}
              <Input
                type="file"
                aria-required="true"
                aria-label="Inserer une image du produit"
                accept='accept="image/jpeg, image/png, image/jpg'
                onChange={(e) => {
                  handleImageChange(e)
                }}
              />
            </CardContent>
          </CardHeader>
          <CardContent>
            <CardTitle>Titre</CardTitle>
            <Input
              aria-required="true"
              aria-label="Changer le nom du produit"
              value={productName ?? ''}
              onChange={(e) => {
                setProductName(e.target.value)
              }}
            />
          </CardContent>
          <CardContent>
            <CardTitle>Description</CardTitle>
            <Textarea
              aria-required="true"
              aria-label="Changer la description du produit"
              value={productDescription ?? ''}
              onChange={(e) => {
                setProductDescription(e.target.value)
              }}
            />
          </CardContent>

          <CardContent>
            <CardTitle>Prix</CardTitle>
            <Input
              type="number"
              aria-required="true"
              step="any"
              min="0"
              value={productPrice ?? ''}
              aria-label="Changer le prix du produit"
              onChange={(e) => {
                setProductPrice(e.target.value)
              }}
            />
          </CardContent>

          <CardContent>
            <CardTitle>Catégorie</CardTitle>
            <Input
              value={productCategory ?? ''}
              aria-required="true"
              aria-label="Changer la catégorie du produit"
              onChange={(e) => {
                setProductCategory(e.target.value)
              }}
              required
            />
          </CardContent>
          <CardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant={'outline'} aria-label="Mettre à jour le produit">
              Mettre à jour
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

export default FormProduct
