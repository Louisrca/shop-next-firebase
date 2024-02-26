'use client'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthUserProvider'
import { Switch } from '@/components/ui/switch'
import { FirebaseError } from 'firebase/app'

const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [checked, setChecked] = useState(true)
  const [role, setRole] = useState('client')
  const router = useRouter()
  const [emailError, setEmailError] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()
  const { signUp } = useAuth()

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/
    return passwordRegex.test(password)
  }

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validatePassword(password)) {
      setPasswordError(
        'Le mot de passe doit contenir au moins 10 caractères avec au moins une majuscule, un chiffre et un caractère spécial.'
      )
      return
    }
    try {
      if (password)
        await signUp(email, password, firstname, lastname, role).then(() => {
          console.log('Success. The user is created in Firebase')
          location.reload()
        })
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case 'auth/email-already-in-use':
            setEmailError('Cette adresse e-mail est déjà utilisée.')
            break
          case 'auth/weak-password':
            setPasswordError(
              'Le mot de passe doit contenir au moins 10 caractères avec au moins une majuscule, un chiffre et un caractère spécial.'
            )
            break
          case 'auth/invalid-email':
            setEmailError('Adresse e-mail invalide.')
            break
        }
      }
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-8">
      <div className="flex flex-col">
        {emailError ? <span className="text-red-500">{emailError} </span> : ''}
        <label>Email</label>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Prénom</label>
        <Input
          placeholder="Prénom"
          type="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label>Nom</label>
        <Input
          placeholder="Nom"
          type="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        {passwordError ? (
          <span className="text-red-500">{passwordError} </span>
        ) : (
          ''
        )}
        <label>Mot de passe</label>
        <Input
          placeholder="Mot de passe"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Role</label>
        <div className="flex space-x-4">
          <Switch
            checked={checked}
            onClick={() => {
              setChecked(!checked)
              checked ? setRole('seller') : setRole('client')
            }}
          />
          <span>{role}</span>
        </div>
      </div>
      <div className="flex space-x-5">
        <Button
          variant={'secondary'}
          className="transition duration-500 hover:bg-slate-900 hover:text-white"
          onClick={() => router.push('/login')}
        >
          Log In ?{' '}
        </Button>
        <Button
          disabled={!email || !password || !firstname || !lastname}
          className="transition duration-500  hover:bg-slate-600 hover:text-white"
          type="submit"
        >
          Valider
        </Button>
      </div>
    </form>
  )
}

export default SignUp
