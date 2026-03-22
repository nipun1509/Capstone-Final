import { createContext, useContext, useState, ReactNode } from "react"

export interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, name?: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (email: string, name?: string) => {
    setUser({ email, name: name || email.split("@")[0] })
  }

  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
