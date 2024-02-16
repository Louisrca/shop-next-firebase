'use client'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthUserProvider'
import { Switch } from '@/components/ui/switch'

const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [checked, setChecked] = useState(true)
  const [role, setRole] = useState('client')
  const router = useRouter()
  const { signUp } = useAuth()

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (password)
        await signUp(email, password, firstname, lastname, role).then(() => {
          console.log('Success. The user is created in Firebase')
          location.reload()
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-8">
      <div>
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
      <div>
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
        <Button variant={'secondary'} onClick={() => router.push('/login')}>
          Log In ?{' '}
        </Button>
        <Button
          disabled={!email || !password || !firstname || !lastname}
          type="submit"
        >
          Valider
        </Button>
      </div>
    </form>
  )
}

export default SignUp
