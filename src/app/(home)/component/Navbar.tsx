'use client'
import { getUserById } from '@/app/api/user/user'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthUserProvider'
import { useEffect, useState } from 'react'
import { DropDownBasket } from './DropDownBasket'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserById(user, user?.uid ?? '')
        setRole(data?.role ?? null)
      }
    }
    fetchData()
  }, [user])

  return (
    <nav
      style={{
        padding: '1%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10,
      }}
    >
      {role === 'client' && <DropDownBasket />}
      <Button variant={'destructive'} onClick={logOut}>
        Logout
      </Button>
    </nav>
  )
}

export default Navbar
