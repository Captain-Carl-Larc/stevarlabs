"use server";

// File: presigned-url.action.ts
// Folder: src/modules/upload

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/auth";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUrlAction(fileName: string, fileType: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized." };

  try {
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueKey = `uploads/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: fileType,
    });

    // Generate a secure upload URL that expires in 60 seconds
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${uniqueKey}`;

    return { signedUrl, publicUrl };
  } catch (error) {
    console.error("Presigned URL Error:", error);
    return { error: "Failed to generate upload URL." };
  }
}