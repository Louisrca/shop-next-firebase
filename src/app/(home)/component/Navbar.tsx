import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthUserProvider'

const Navbar = () => {
  const { logOut } = useAuth()

  return (
    <nav>
      <div>
        <Button
          variant={'outline'}
          onClick={() => {
            logOut()
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
