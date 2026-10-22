// File: route.ts
// Route/Folder: src/app/api/download
// Purpose: Processes the resource download form and emails the requested asset.
// Imports: NextResponse, Resend, Zod

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const downloadSchema = z.object({
  resource_id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  marketing: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const validatedData = downloadSchema.parse({
      resource_id: formData.get("resource_id"),
      name: formData.get("name") || "there",
      email: formData.get("email"),
      marketing: formData.get("marketing") === "on",
    });

    // 1. Send the requested resource to the user
    // Note: You would typically host the PDF in your Cloudflare R2 bucket and link it here
    const resourceLink = "https://your-r2-public-url.com/dental-recall-templates.pdf"; 

    await resend.emails.send({
      from: "Stevarlabs Resources <onboarding@resend.dev>",
      to: validatedData.email,
      subject: "Your Dental Recall Templates - Stevarlabs",
      html: `
        <p>Hi ${validatedData.name},</p>
        <p>Thanks for requesting the dental recall and follow-up templates.</p>
        <p>You can view and download your templates using the link below:</p>
        <p><a href="${resourceLink}"><strong>Download Templates (PDF)</strong></a></p>
        <p>If you need any help implementing these within your practice management system, just hit reply.</p>
        <p>Best regards,<br>Stevarlabs Team</p>
      `,
    });

    // 2. Add to database / mailing list if marketing is true
    if (validatedData.marketing) {
      // In the future, write to Prisma DB or sync directly to an email tool like Mailchimp/Resend Audiences
      console.log(`User ${validatedData.email} opted into marketing emails.`);
    }

    // Redirect back to the resource page
    return NextResponse.redirect(new URL(`/resources/${validatedData.resource_id}?success=true`, request.url), 303);

  } catch (error) {
    console.error("Download Form Error:", error);
    return NextResponse.redirect(new URL("/resources?error=true", request.url), 303);
  }
}