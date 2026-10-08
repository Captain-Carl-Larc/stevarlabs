"use server";

// File: delete-post.action.ts
// Folder: src/modules/posts

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Role } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
  const session = await auth();
  if (!session || (session.user.role !== Role.SUPERADMIN && session.user.role !== Role.ADMIN)) {
    return { error: "Unauthorized action." };
  }

  try {
    await db.post.delete({ where: { id } });
    revalidatePath("/admin/posts");
    return { success: "Post deleted successfully." };
  } catch (error: any) {
    console.error("Delete Post Error:", error);
    return { error: "Failed to delete post." };
  }
}