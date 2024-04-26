export const API_BASE_URL = `${process.env.API_URL}/api`

export const KEY_JWT_TOKEN = 'JWT_TOKEN'

export const Routes = {
  LOGIN: '/',
  ADMIN: '/admin',
  POST: '/post',
  CREATE_POST: '/create-post',
  EDIT_POST: '/edit-post',
  DELETE_POST: '/delete-post',
  LOGOUT: '/logout',
} as const
