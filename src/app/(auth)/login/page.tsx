'use client'
import { useState, FormEvent } from 'react'
import { FirebaseError } from 'firebase/app'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { Card, CardHeader } from '@/components/ui/card'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userError, setUserError] = useState<string>()
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
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case 'auth/invalid-credential':
            setUserError("L'adresse e-mail ou le mot de passe est incorrect.")

            break
        }
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-8 text-xl font-extrabold tracking-tight lg:text-3xl">
        WINDOW SHOPPER
      </h1>
      <Card className="authForm">
        <CardHeader>
          <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
            Log In
          </h2>
        </CardHeader>

        <form onSubmit={handleOnSubmit} className="space-y-8">
          <div className="flex flex-col">
            {userError ? (
              <span className="text-red-500">{userError} </span>
            ) : (
              ''
            )}
            <label>Email</label>
            <Input
              aria-label="Votre Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Mot de passe</label>
            <Input
              aria-label="Votre mot de passe"
              placeholder="Mot de passe"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex space-x-5">
            <Button
              aria-label="Naviguer vers la page de création de compte"
              variant={'secondary'}
              className="transition duration-500 hover:bg-slate-950 hover:text-white"
              onClick={() => router.push('/')}
            >
              Sign Up ?{' '}
            </Button>
            <Button
              disabled={!email || !password}
              aria-label="Valider la connexion"
              className="transition duration-500 hover:bg-slate-600 hover:text-white"
              type="submit"
            >
              Valider
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default LogIn
