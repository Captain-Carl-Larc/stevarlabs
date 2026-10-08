"use server";

// File: create-post.action.ts
// Folder: src/modules/posts
// Description: Creates a new blog post, handles slug generation, and stringifies Tiptap JSON.

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role, PostStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

// Shared utility
function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

type CreatePostInput = {
  title: string;
  slug?: string;
  content: any; // Tiptap JSON
  categoryId: string;
  status?: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  imageAltText?: string;
};

export async function createPostAction(data: CreatePostInput) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN && session.user.role !== Role.EDITOR)) {
    return { error: "Unauthorized action." };
  }

  const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);

  try {
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) return { error: "A post with this slug already exists." };

    // Automatically set the published timestamp if created as PUBLISHED
    const publishedAt = data.status === PostStatus.PUBLISHED ? new Date() : null;

    await db.post.create({
      data: {
        title: data.title,
        slug,
        // Stringify the rich text JSON for storage
        content: JSON.stringify(data.content),
        categoryId: data.categoryId,
        authorId: session.user.id,
        status: data.status || PostStatus.DRAFT,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        featuredImage: data.featuredImage,
        imageAltText: data.imageAltText,
        publishedAt,
      },
    });

    revalidatePath("/admin/posts");
    return { success: "Post created successfully." };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { error: "Failed to create post." };
  }
}