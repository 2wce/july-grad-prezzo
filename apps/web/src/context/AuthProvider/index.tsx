import { User } from 'generated/graphql'
import { isEqual } from 'lodash'
import * as React from 'react'
import { STRAPI_USER_STORAGE_KEY } from '../../constants'
import { useBrowserStorage } from '../../hooks'
import { StrapiLoginPayload } from '../../utils'

type AuthProviderProps = {
  logout: () => void
  isAuthenticating: boolean
  isAuthenticated: boolean
  user: User
  persistUser: (data: StrapiLoginPayload, rememberMe?: boolean) => void
  register: (username: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  socialAuth: (provider: string, accessToken: string) => Promise<void>
}

const AuthContext = React.createContext<Partial<AuthProviderProps>>({})

export const useAuthContext = (): Partial<AuthProviderProps> => React.useContext(AuthContext)

type UserStorage = StrapiLoginPayload | null

const AuthProvider: React.FC = ({ children }) => {
  const [localUser, setLocalUser, removeLocalUser] = useBrowserStorage<UserStorage>(
    STRAPI_USER_STORAGE_KEY,
    'local'
  )

  const [sessionUser, setSessionUser, removeSessionUser] = useBrowserStorage<UserStorage>(
    STRAPI_USER_STORAGE_KEY,
    'session'
  )

  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [isAuthenticating, setIsAuthenticating] = React.useState(true)

  const [user, setUser] = React.useState(sessionUser?.user || localUser?.user)

  const persistUser = (data: StrapiLoginPayload, rememberMe?: boolean) => {
    rememberMe ? setLocalUser(data) : setSessionUser(data)
    setUser(data?.user)
  }

  const logout = () => {
    removeLocalUser()
    removeSessionUser()
    setIsAuthenticated(false)
    setUser(undefined)
  }

  React.useEffect(() => {
    if (user) {
      setIsAuthenticated(true)
      if (localUser?.user && !isEqual(localUser?.user, user)) {
        setLocalUser({ jwt: localUser.jwt, user })
      }
      if (sessionUser?.user && !isEqual(sessionUser?.user, user)) {
        setSessionUser({ jwt: sessionUser.jwt, user })
      }
    } else {
      setIsAuthenticated(false)
    }
    setIsAuthenticating(false)
    // eslint-disable-next-line
  }, [user])

  const login = async () => {
    // @TODO: Implement login
  }

  const register = async () => {
    // @TODO: Implement register
  }

  const socialAuth = async () => {
    // @TODO: Implement social auth
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        persistUser,
        isAuthenticated,
        isAuthenticating,
        user,
        setUser,
        socialAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
