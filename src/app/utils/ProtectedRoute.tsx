'use client'
import { useAuth } from '@/context/AuthUserProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getUserById } from '../api/user/user'
import { CartProvider } from '@/context/card/CardProvider'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (!user) {
        router.push('/')
        return
      }

      try {
        const userData = await getUserById(user, user?.uid)
        const userRole = userData?.role ?? null

        switch (userRole) {
          case 'seller':
            router.push('/seller')
            break
          case 'client':
            router.push('/client')
            break
          default:
            router.push('/')
            break
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération du rôle de l’utilisateur:',
          error
        )
        router.push('/')
      }
    }

    fetchAndRedirect()
  }, [user, router])

  return (
    <>
      <>{children}</>
    </>
  )
}
