import {
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../config/firebase-config'
import { Products } from '@/app/model/products'

export const getProductById = async (productId: string) => {
  const productDocRef = doc(db, 'products', productId)
  const productSnapshot = await getDoc(productDocRef)
  if (productSnapshot.exists()) {
    return productSnapshot.data() as Products
  } else {
    console.log('No such product!')
    return undefined
  }
}

export const getProducts = async () => {
  const productsCollectionRef = collection(db, 'products')
  const productsSnapshot = await getDocs(productsCollectionRef)

  const products: Products[] = []
  productsSnapshot.forEach((doc) => {
    products.push(doc.data() as Products)
  })

  return products
}

export const createProduct = async (product: Products) => {
  const productsCollectionRef = collection(db, 'products')
  const productDocRef = await addDoc(productsCollectionRef, product)
  await updateDoc(productDocRef, { id: productDocRef.id })
  return productDocRef.id
}

export const updateProduct = async (product: Products) => {
  if (!product.id) throw new Error('Product ID is required for update.')
  const productsCollectionRef = collection(db, 'products')
  const productDocRef = doc(productsCollectionRef, product.id!)

  const productDataToUpdate: Partial<Products> = {
    name: product.name,
    price: product.price,
    description: product.description,
    file: product.file,
    category: product.category,
    user: product.user,
  }

  await updateDoc(productDocRef, productDataToUpdate)
  return productDocRef.id
}

export const deleteProduct = async (productId: string) => {
  const productDocRef = doc(db, 'products', productId)
  await deleteDoc(productDocRef)
}
