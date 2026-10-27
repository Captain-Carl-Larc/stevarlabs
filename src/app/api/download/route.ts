// File: route.ts
// Route/Folder: src/app/api/download
// Purpose: Processes the resource download form, emails the requested asset to the lead,
//          and notifies the owner of the new lead.
// Imports: NextResponse, Resend, Zod
//
// Required env vars:
//   RESEND_API_KEY   - your Resend API key
//   R2_PUBLIC_URL    - public base URL of your R2 bucket, no trailing slash
//                      e.g. https://pub-xxxx.r2.dev  or  https://files.stevarlabs.co.uk

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const LEAD_NOTIFY_TO = "stephenmutwiiofficial@gmail.com";
const LEAD_NOTIFY_FROM = "Stevarlabs Leads <leads@mail.stevarlabs.co.uk>";
const RESOURCE_FROM = "Stevarlabs Resources <resources@mail.stevarlabs.co.uk>";

// One entry per downloadable resource.
// `slug` is the public page the user is sent back to after submitting the form.
const RESOURCES: Record<
  string,
  { slug: string; title: string; subject: string; fileName: string }
> = {
  "recall-templates": {
    slug: "recall-message-templates",
    title: "Dental Recall Message Pack",
    subject: "Your Dental Recall Message Pack - Stevarlabs",
    fileName: "dental-recall-templates.pdf",
  },
};

const downloadSchema = z.object({
  resource_id: z.string().min(1),
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().toLowerCase().email().max(254),
  marketing: z.boolean().default(false),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const validatedData = downloadSchema.parse({
      resource_id: formData.get("resource_id"),
      name: formData.get("name") || undefined,
      email: formData.get("email"),
      marketing: formData.get("marketing") === "on",
    });

    const resource = RESOURCES[validatedData.resource_id];
    if (!resource) {
      throw new Error(`Unknown resource_id: ${validatedData.resource_id}`);
    }

    const baseUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
    if (!baseUrl) {
      throw new Error("R2_PUBLIC_URL is not set");
    }

    const resourceLink = `${baseUrl}/${resource.fileName}`;
    const displayName = validatedData.name ? escapeHtml(validatedData.name) : "there";
    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Send both emails at once. The lead's email and the owner notification are independent,
    // so a failure in one never blocks the other.
    const [leadResult, notifyResult] = await Promise.allSettled([
      // 1. The resource, sent to the lead
      resend.emails.send({
        from: RESOURCE_FROM,
        to: validatedData.email,
        subject: resource.subject,
        html: `
          <p>Hi ${displayName},</p>
          <p>Thanks for requesting the ${escapeHtml(resource.title)}.</p>
          <p>You can view and download it using the link below:</p>
          <p><a href="${resourceLink}"><strong>Download the pack (PDF)</strong></a></p>
          <p>If you need any help setting these up in your practice management system, just hit reply.</p>
          <p>Best regards,<br>Stevarlabs Team</p>
        `,
      }),

      // 2. Lead notification, sent to the owner. Replying goes straight to the lead.
      resend.emails.send({
        from: LEAD_NOTIFY_FROM,
        to: LEAD_NOTIFY_TO,
        replyTo: validatedData.email,
        subject: `New lead: ${validatedData.name || validatedData.email} (${resource.title})`,
        html: `
          <h2 style="margin:0 0 12px">New resource download</h2>
          <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
            <tr><td><strong>Name</strong></td><td>${validatedData.name ? escapeHtml(validatedData.name) : "Not given"}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(validatedData.email)}">${escapeHtml(validatedData.email)}</a></td></tr>
            <tr><td><strong>Resource</strong></td><td>${escapeHtml(resource.title)}</td></tr>
            <tr><td><strong>Marketing consent</strong></td><td>${validatedData.marketing ? "Yes, opted in" : "No, download only"}</td></tr>
            <tr><td><strong>Submitted</strong></td><td>${submittedAt} (UK time)</td></tr>
          </table>
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#555">
            Hit reply to email this lead directly.
            ${validatedData.marketing ? "" : "They did not opt in to marketing, so only follow up about the download itself."}
          </p>
        `,
      }),
    ]);

    // Resend resolves with { data, error } rather than throwing, so check both layers.
    if (notifyResult.status === "rejected" || notifyResult.value.error) {
      const reason =
        notifyResult.status === "rejected" ? notifyResult.reason : notifyResult.value.error;
      console.error("Lead notification failed:", reason);
    }

    if (leadResult.status === "rejected" || leadResult.value.error) {
      const reason = leadResult.status === "rejected" ? leadResult.reason : leadResult.value.error;
      throw new Error(`Resource email failed: ${JSON.stringify(reason)}`);
    }

    // 3. Add to database / mailing list if marketing is true
    if (validatedData.marketing) {
      // In the future, write to Prisma DB or sync directly to an email tool like Mailchimp/Resend Audiences
      console.log(`User ${validatedData.email} opted into marketing emails.`);
    }

    // Redirect back to the resource page
    return NextResponse.redirect(
      new URL(`/resources/${resource.slug}?success=true`, request.url),
      303
    );
  } catch (error) {
    console.error("Download Form Error:", error);
    return NextResponse.redirect(new URL("/resources?error=true", request.url), 303);
  }
}