'use server'

import { cookies } from 'next/headers'

export const cookieStoreGet = async (key: string) => {
  const cookieStore = cookies()
  const token = cookieStore.get(key)
  return token?.value === '' ? undefined : token?.value
}

export const cookieStoreSet = async (key: string, value: string) => {
  cookies().set(key, value, {
    httpOnly: true, // Secure the cookie from client-side scripts
    sameSite: 'lax', // CSRF protection
    path: '/', // Cookie will be accessible on all pages
  })
}

export const cookieStoreRemove = (key: string) => {
  cookies().delete(key)
}
