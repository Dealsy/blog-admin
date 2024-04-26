'use server'

import { sql } from '@vercel/postgres'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import bcrypt from 'bcrypt'

import jwt, { JwtPayload } from 'jsonwebtoken'
import { Post } from '@/app/admin/page'

import { cookieStoreGet } from '@/utils/cookie-store'
import { KEY_JWT_TOKEN } from '@/contstants'
import { revalidatePath } from 'next/cache'

interface CustomJwtPayload extends JwtPayload {
  id: number
}

const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title'],
    span: ['class', 'style'],
  },
}

export async function register(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: any }> {
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const { rows } = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
        RETURNING id, email;
      `

    return {
      success: true,
      message: 'User registered successfully.',
      user: rows[0],
    }
  } catch (error: any) {
    if (error.code === '23505') {
      return { success: false, message: 'User already exists.' }
    }
    return { success: false, message: 'Error creating new user.' }
  }
}

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; token?: string }> {
  try {
    const { rows } = await sql`SELECT id, password FROM users WHERE email = ${email}`

    if (rows.length === 0) {
      return { success: false, message: 'Invalid email or password.' }
    }

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return { success: false, message: 'Invalid email or password.' }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '2h' },
    )

    return { success: true, message: 'Login successful.', token }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to login due to an error.',
    }
  }
}

export async function getPost(id: number) {
  revalidatePath(`/api/posts/${[id]}`)

  try {
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${id};`

    if (rows.length === 0) {
      return { error: 'Post not found' }
    }

    const processedPosts = rows.map(
      (post): Post => ({
        id: post.id,
        title: post.title,
        sub_title: post.sub_title,
        content: sanitizeHtml(marked(post.content) as string, sanitizeOptions),
        created_at: post.created_at,
        updated_at: post.updated_at,
        category: post.category,
        type: post.type,
      }),
    )

    return { posts: processedPosts }
  } catch (error) {
    console.error(error)
    return { error: 'Error retrieving the post' }
  }
}

export async function getPosts(): Promise<{ posts?: Post[]; error?: string }> {
  revalidatePath('/api/posts')
  try {
    const { rows } =
      await sql`SELECT id, title, sub_title, content, created_at, category, type, updated_at FROM posts WHERE type = ${'public'} ORDER BY created_at DESC`

    if (rows.length === 0) {
      console.log('No posts found.')
      return { posts: [] }
    }

    const processedPosts: Post[] = rows.map(
      (post): Post => ({
        id: post.id,
        title: post.title,
        sub_title: post.sub_title,
        content: sanitizeHtml(marked(post.content) as string, sanitizeOptions),
        created_at: post.created_at,
        updated_at: post.updated_at,
        category: post.category,
        type: post.type,
      }),
    )

    return { posts: processedPosts }
  } catch (error: any) {
    console.error(error)
    return { error: 'Error retrieving posts: ' + error.message }
  }
}

export default async function getMyPosts() {
  const token = await cookieStoreGet(KEY_JWT_TOKEN)

  if (!token) {
    return { error: 'Unauthorized access - user not identified' }
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as CustomJwtPayload
  } catch (error) {
    return { error: 'Invalid token' }
  }

  const user_id = decoded.id

  try {
    const { rows } =
      await sql`SELECT * FROM posts WHERE user_id = ${user_id} ORDER BY created_at DESC`

    if (rows.length === 0) {
      console.log('No posts found.')
      return { posts: [] }
    }

    const processedPosts: Post[] = rows.map(
      (post): Post => ({
        id: post.id,
        title: post.title,
        sub_title: post.sub_title,
        content: sanitizeHtml(marked(post.content) as string, sanitizeOptions),
        created_at: post.created_at,
        updated_at: post.updated_at,
        category: post.category,
        type: post.type,
      }),
    )

    return { posts: processedPosts }
  } catch (error: any) {
    console.error(error)
    return { error: 'Error retrieving posts: ' + error.message }
  }
}
