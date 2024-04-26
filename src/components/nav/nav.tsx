'use client'

import { useAuth } from '@/context/authProvider'
import { KEY_JWT_TOKEN, Routes } from '@/contstants'
import { cookieStoreRemove } from '@/utils/cookie-store'
import NavLink from '../ui/navLink'

export default function Nav() {
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = async () => {
    cookieStoreRemove(KEY_JWT_TOKEN)
    logout()
  }

  return (
    <nav className="flex items-center justify-between bg-primary p-8 text-white">
      <ul className="flex items-center space-x-4">
        <li>
          <NavLink route={Routes.LOGIN} text="Blog" />
        </li>
      </ul>

      <ul className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <li>
              <NavLink route={Routes.LOGIN} onClick={handleLogout} text="Logout" />
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
