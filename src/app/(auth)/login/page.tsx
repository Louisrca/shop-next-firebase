'use client'
import { useState, FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (password)
        await signInWithEmailAndPassword(auth, email, password).then(() => {
          console.log('Success. The user is logged in Firebase')
          location.reload()
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card style={{ padding: '2%', width: '26em' }}>
        <CardHeader>
          <CardTitle style={{ fontSize: 34 }}>Log In</CardTitle>
        </CardHeader>

        <form onSubmit={handleOnSubmit} className="space-y-8">
          <div>
            <label>Email</label>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Mot de passe</label>
            <Input
              placeholder="Mot de passe"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex space-x-5">
            <Button variant={'secondary'} onClick={() => router.push('/')}>
              Sign Up ?{' '}
            </Button>
            <Button disabled={!email || !password} type="submit">
              Valider
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default LogIn
