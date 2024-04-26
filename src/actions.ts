"use server";

import { revalidatePath } from "next/cache";

import { KEY_JWT_TOKEN } from "./contstants";
import { sql } from "@vercel/postgres";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookieStoreGet } from "./utils/cookie-store";

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export async function createPost(
  title: string,
  content: string,
  sub_title: string,
  category: string,
  type: string
) {
  const token = await cookieStoreGet(KEY_JWT_TOKEN);

  if (!token) {
    return {
      success: false,
      message: "Unauthorized access - user not identified",
    };
  }

  let userId;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJwtPayload;

    userId = decoded.id;
  } catch (error) {
    return { success: false, message: "Invalid token" };
  }

  if (!type) {
    return { success: false, message: "Missing type" };
  }

  try {
    const { rows } = await sql`
      INSERT INTO posts (title, content, sub_title, category, type, user_id)
      VALUES (${title}, ${content}, ${sub_title}, ${category}, ${type}, ${userId})
      RETURNING *;
    `;
    const newPost = rows[0];

    revalidatePath("/");

    return {
      success: true,
      message: "Post created successfully.",
      post: newPost,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating the post" };
  }
}

export async function deletePost(id: number) {
  try {
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${id}`;

    if (rows.length === 0) {
      return { error: "Post not found" };
    }

    await sql`DELETE FROM posts WHERE id = ${id}`;

    revalidatePath("/");

    return rows[0];
  } catch (error) {
    console.error(error);
    return { error: "Error deleting the post!" };
  }
}

export async function updatePost(
  id: number,
  title: string,
  content: string,
  sub_title: string,
  category: string,
  type: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${id}`;

    if (rows.length === 0) {
      return { success: false, message: "Post not found" };
    }

    const token = await cookieStoreGet(KEY_JWT_TOKEN);

    if (!token) {
      return {
        success: false,
        message: "Unauthorized access - user not identified",
      };
    }

    let userId;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJwtPayload;

    userId = decoded.id;

    await sql`
      UPDATE posts
      SET title = ${title}, content = ${content}, sub_title = ${sub_title}, category = ${category}, type = ${type}, updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId};
    `;

    revalidatePath("/");

    return { success: true, message: "Post updated successfully." };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update post.",
    };
  }
}
