import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServerClient } from "@/lib/supabase";
import { buildConfirmationEmail } from "@/emails/contact-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = "hello@hasitha.dev";
const FROM_ADDRESS = "hasitha.dev <noreply@mail.hasitha.dev>";
const REPLY_TO_ADDRESS = "hello@hasitha.dev";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const honeypot = String(body.website ?? ""); // honeypot

    // Honeypot
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "That email address doesn't look right." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long (max 5000 characters)." },
        { status: 400 }
      );
    }

    // 1. Store in Supabase
    const supabase = getSupabaseServerClient();
    const { error: dbError } = await supabase
      .from("messages")
      .insert({ name, email, message });

    if (dbError) {
      console.error("Supabase insert failed:", dbError);
    }

    // 2. Notify with the raw message
    const notifyPromise = resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // 3. Send sender a confirmation
    const { subject, html, text } = buildConfirmationEmail({ name, message });
    const confirmPromise = resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: REPLY_TO_ADDRESS,
      subject,
      html,
      text,
    });

    const [notifyResult, confirmResult] = await Promise.allSettled([
      notifyPromise,
      confirmPromise,
    ]);

    if (notifyResult.status === "rejected") {
      console.error("Notify email failed:", notifyResult.reason);
    }
    if (confirmResult.status === "rejected") {
      console.error("Confirmation email failed:", confirmResult.reason);
    }

    // If both emails failed, tell the user something went wrong
    if (
      notifyResult.status === "rejected" &&
      confirmResult.status === "rejected"
    ) {
      return NextResponse.json(
        { ok: false, error: "Message saved but emails failed to send." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
