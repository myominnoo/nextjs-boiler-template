// ============================================================
//  /app/api/contact/route.ts
//  Handles POST requests from the Contact form.
//  Sends a formatted email via Resend.
//
//  Required env vars in .env.local:
//    RESEND_API_KEY   — from resend.com dashboard
//    CONTACT_TO_EMAIL — the inbox that receives enquiries
//                       (must be a verified domain on Resend)
//
//  Install the SDK:  npm i resend
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "@/config/client";

// ── Resend client ─────────────────────────────────────────
// Instantiated per-module (not per-request) — safe at module scope.
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Request body shape ────────────────────────────────────
interface ContactBody {
  name:    string;
  email:   string;
  phone:   string;
  message: string;
}

// ── Simple server-side validation ─────────────────────────
function validate(body: ContactBody): string | null {
  if (!body.name?.trim())    return "Name is required.";
  if (!body.email?.trim())   return "Email is required.";
  if (!body.phone?.trim())   return "Phone is required.";
  if (!body.message?.trim()) return "Message is required.";

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_RE.test(body.email)) return "Please enter a valid email address.";

  return null; // valid
}

// ── POST handler ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Validate
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // 3. Check env vars
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error("[contact/route] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.");
    return NextResponse.json(
      { error: "Email service not configured. Please call us directly." },
      { status: 503 }
    );
  }

  // 4. Send via Resend
  const { name, email, phone, message } = body;

  const { error: resendError } = await resend.emails.send({
    // "from" must use a domain you've verified in Resend.
    // Update the domain part when you go live.
    from:     `${client.businessName} Website <noreply@${new URL(client.siteUrl).hostname}>`,
    to:       [toEmail],
    replyTo:  email,
    subject:  `New enquiry from ${name} — ${client.businessNameShort}`,
    html: `
      <h2 style="font-family:sans-serif;margin-bottom:16px;">
        New quote request from ${client.businessName} website
      </h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px;">
        <tr>
          <td style="padding:8px 12px;font-weight:600;background:#f4f4f5;width:120px;">Name</td>
          <td style="padding:8px 12px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;background:#f4f4f5;">Email</td>
          <td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;background:#f4f4f5;">Phone</td>
          <td style="padding:8px 12px;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;background:#f4f4f5;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;white-space:pre-wrap;">${message}</td>
        </tr>
      </table>
      <p style="font-family:sans-serif;color:#888;font-size:12px;margin-top:24px;">
        Sent from the contact form at ${client.siteUrl}
      </p>
    `,
  });

  if (resendError) {
    console.error("[contact/route] Resend error:", resendError);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or call us directly." },
      { status: 502 }
    );
  }

  // 5. Success
  return NextResponse.json({ success: true }, { status: 200 });
}