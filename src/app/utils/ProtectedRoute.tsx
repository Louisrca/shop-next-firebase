'use client'
import { useAuth } from '@/context/AuthUserProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getUserById } from '../api/user/user'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [role, setRole] = useState<string | null>(null)

  const router = useRouter()
  const { user } = useAuth()
  console.log('🚀 ~ role:', role)
  console.log('🚀 ~ user:', user)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserById(user, user?.uid ?? '')
        setRole(data?.role ?? null)
      }

      switch (role) {
        case 'seller':
          if (user) router.push('/seller')
          break
        case 'client':
          if (user) router.push('/client')
          break
        default:
          router.push('/')
          break
      }
    }

    fetchData()
  }, [user, role, router])

  return <>{children}</>
}
