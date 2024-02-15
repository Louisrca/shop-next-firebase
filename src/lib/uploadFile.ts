import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '@/app/config/firebase-config' // Add this import

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage(app)

  const storageRef = ref(storage, `/products/${file.name}`)

  try {
    const snapshot = await uploadBytes(storageRef, file)

    const fileUrl = await getDownloadURL(snapshot.ref)
    return fileUrl
  } catch (error) {
    console.error('Upload failed', error)
    throw new Error('Upload failed: ' + error)
  }
}
