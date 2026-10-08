"use server";

// File: upload.action.ts
// Folder: src/modules/upload
// Description: Server action to securely upload files to Cloudflare R2 via S3 API.

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImageAction(formData: FormData) {
  // 1. Security: Only logged-in CMS users can upload files
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized. Please log in to upload files." };
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return { error: "No file provided." };
  }

  // 2. Validate file type (prevent malicious uploads)
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }

  try {
    // 3. Prepare the file buffer and generate a unique filename
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create a safe, unique filename: timestamp-original-name.extension
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const fileName = `uploads/${Date.now()}-${safeName}`;

    // 4. Upload to Cloudflare R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // 5. Return the public URL
    const fileUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    return { url: fileUrl };

  } catch (error) {
    console.error("R2 Upload Error:", error);
    return { error: "Failed to upload image to the server." };
  }
}