'use client'
import { useState, FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase-config'

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
    <form onSubmit={handleOnSubmit} className="space-y-8">
      <div>
        <label>Username</label>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex space-x-5">
        <Button onClick={() => router.push('/')}>Sign Up ? </Button>
        <Button disabled={!email || !password} type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default LogIn
