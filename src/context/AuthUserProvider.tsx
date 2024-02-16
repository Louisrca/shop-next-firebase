"use client"
import React, { useContext, useState, createContext, useEffect } from 'react'
import { auth, db } from '../app/config/firebase-config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface User {
  email: string | null
  uid: string | null
}

interface AuthContextType {
  user: User | null
  logIn: (email: string, password: string) => Promise<void>
  signUp: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string
  ) => Promise<void>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        firstname,
        lastname,
        role,
      })
    } catch (error) {
      console.error('SignUp error:', error)
      throw error
    }
  }

  const logIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('LogIn error:', error)
      throw error
    }
  }

  const logOut = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('LogOut error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  )
}
