import { User } from '../../model/user'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase-config'

export const getUserById = async (user: User, uid: string | null) => {
  if (user && uid) {
    const userDocRef = doc(db, 'users', uid)
    const userSnapshot = await getDoc(userDocRef)
    if (userSnapshot.exists()) {
      return userSnapshot.data() as User
    } else {
      console.log('No such user!')
      return undefined
    }
  }
}
