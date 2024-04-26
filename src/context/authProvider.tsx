'use client'

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { cookieStoreGet, cookieStoreSet } from '@/utils/cookie-store'
import jwtDecoder from '@/utils/auth'
import { KEY_JWT_TOKEN } from '@/contstants'

export interface User {
  id: number
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: (token?: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = async () => {
    setUser(null)
  }

  const login = async (token: string) => {
    if (token) cookieStoreSet(KEY_JWT_TOKEN, token)

    setUser(jwtDecoder(token)?.payload as User)
  }

  useEffect(() => {
    const fetchTokenAndDecode = async () => {
      const token = await cookieStoreGet('JWT_TOKEN')
      if (!token) {
        setUser(null)
        setIsLoading(false)
        return
      }

      const decoded = jwtDecoder(token)

      if (!decoded || !decoded.payload) {
        setUser(null)
        setIsLoading(false)
        return
      }

      setUser(decoded.payload as User)
      setIsLoading(false)
    }

    fetchTokenAndDecode()
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
