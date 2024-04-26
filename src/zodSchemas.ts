import { z } from 'zod'

const emailSchema = z.string().email()
const passwordSchema = z.string().min(8)

export const RegisterSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirm_password: z.string().min(8),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sub_title: z.string().min(1, 'Sub Title is required'),
  type: z.enum(['public', 'private']),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
})
