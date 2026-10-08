"use server";

// File: update-post.action.ts
// Folder: src/modules/posts

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role, PostStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

type UpdatePostInput = {
  title: string;
  slug?: string;
  content: any;
  categoryId: string;
  status: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  imageAltText?: string;
};

export async function updatePostAction(id: string, data: UpdatePostInput) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN && session.user.role !== Role.EDITOR)) {
    return { error: "Unauthorized action." };
  }

  const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);

  try {
    // Prevent slug collisions with OTHER posts
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return { error: "Another post is already using this URL slug." };
    }

    const currentPost = await db.post.findUnique({ where: { id } });
    
    // Automatically set publishedAt if status changes from DRAFT to PUBLISHED
    let publishedAt = currentPost?.publishedAt;
    if (currentPost?.status === PostStatus.DRAFT && data.status === PostStatus.PUBLISHED) {
      publishedAt = new Date();
    }

    await db.post.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        content: JSON.stringify(data.content),
        categoryId: data.categoryId,
        status: data.status,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        featuredImage: data.featuredImage,
        imageAltText: data.imageAltText,
        publishedAt,
      },
    });

    revalidatePath("/admin/posts");
    return { success: "Post updated successfully." };
  } catch (error: any) {
    console.error("Update Post Error:", error);
    return { error: `Failed to update post. Details: ${error.message}` };
  }
}