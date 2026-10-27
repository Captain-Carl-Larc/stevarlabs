// File: route.ts
// Route/Folder: src/app/api/contact
// Purpose: Handles the general contact form.
// Imports: NextResponse, Resend, Zod

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  practice: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const validatedData = contactSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      practice: formData.get("practice") || "",
      message: formData.get("message"),
    });

    // Send the message to the agency
    await resend.emails.send({
      from: "Stevarlabs Contact <leads@mail.stevarlabs.co.uk>", 
      to: "stephenmutwiiofficial@gmail.com", 
      subject: `New Contact Message from ${validatedData.name}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Practice:</strong> ${validatedData.practice || "Not provided"}</p>
        <h3>Message:</h3>
        <p>${validatedData.message}</p>
      `,
    });

    return NextResponse.redirect(new URL("/contact?success=true", request.url), 303);

  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.redirect(new URL("/contact?error=true", request.url), 303);
  }
}