// File: route.ts
// Route/Folder: src/app/api/audit
// Purpose: Handles the Free Audit form submission, validates data, and sends notification via Resend.
// Imports: NextResponse, Resend, Zod

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the validation schema
const auditSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  practice: z.string().min(2, "Practice name is required"),
  website: z.string().url("Invalid URL"),
  town: z.string().optional(),
  marketing: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse and validate the form data
    const validatedData = auditSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      practice: formData.get("practice"),
      website: formData.get("website"),
      town: formData.get("town") || "",
      marketing: formData.get("marketing") === "on",
    });

    // 1. Send internal notification to the agency owner
    await resend.emails.send({
      from: "Stevarlabs Leads <audit@mail.stevarlabs.co.uk>", // Replace with your verified domain e.g., updates@fyutchalabs.tech
      to: "stephenmutwiiofficial@gmail.com", // The owner's email where leads should go
      subject: `New Audit Request: ${validatedData.practice}`,
      html: `
        <h2>New Free Practice Growth Audit Request</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Practice Name:</strong> ${validatedData.practice}</p>
        <p><strong>Website:</strong> <a href="${validatedData.website}">${validatedData.website}</a></p>
        <p><strong>Town/City:</strong> ${validatedData.town || "Not provided"}</p>
        <p><strong>Marketing Opt-in:</strong> ${validatedData.marketing ? "Yes" : "No"}</p>
      `,
    });

    // 2. Send confirmation to the practice owner (Optional but good for UX)
    await resend.emails.send({
      from: "Stevarlabs <onboarding@resend.dev>", // Replace with your verified domain
      to: validatedData.email,
      subject: "We've received your audit request - Stevarlabs",
      html: `
        <p>Hi ${validatedData.name},</p>
        <p>Thanks for requesting a free practice growth audit for ${validatedData.practice}.</p>
        <p>We're reviewing your website, Google profile, and search visibility now. You will receive your plain-English report within the next few working days.</p>
        <p>Best regards,<br>Stephen Kalwenzi Mutwii<br>Stevarlabs</p>
      `,
    });

    // Redirect back to the audit page with a success parameter (303 is required for POST redirects)
    return NextResponse.redirect(new URL("/free-audit?success=true", request.url), 303);

  } catch (error) {
    console.error("Audit Form Error:", error);
    // In a real production app, redirect to an error page or pass an error param
    return NextResponse.redirect(new URL("/free-audit?error=true", request.url), 303);
  }
}