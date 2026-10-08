"use server";

// File: create-post.action.ts
// Folder: src/modules/posts

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role, PostStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

type CreatePostInput = {
  title: string;
  slug?: string;
  content: any;
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
    return { error: "Unauthorized action. Your session may have expired." };
  }

  const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);

  try {
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) return { error: "A post with this slug already exists." };

    const publishedAt = data.status === PostStatus.PUBLISHED ? new Date() : null;

    await db.post.create({
      data: {
        title: data.title,
        slug,
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
  } catch (error: any) {
    // Log the full stack trace to your Vercel/Local console
    console.error("🔥 CRITICAL DB ERROR CREATING POST:", error);

    // Surface Prisma-specific database errors
    if (error.code === 'P2003') {
      return { error: "Database Relation Error: The selected Category or Author ID does not exist in the database." };
    }
    if (error.code === 'P2002') {
      return { error: "Database Conflict: A unique constraint failed (likely the slug)." };
    }

    // Extract the raw error message to show in the red UI box
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return { 
      error: `Failed to create post. Details: ${errorMessage}` 
    };
  }
}