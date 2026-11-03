import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

type RateEntry = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateEntry>();

function checkRateLimit(identifier: string) {
  const now = Date.now();
  const entry = rateBuckets.get(identifier);

  if (!entry || entry.resetAt < now) {
    rateBuckets.set(identifier, { count: 1, resetAt: now + RATE_WINDOW_MS });
    if (rateBuckets.size > 500) {
      for (const [key, value] of rateBuckets) {
        if (value.resetAt < now) rateBuckets.delete(key);
      }
    }
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function cleanLine(value: unknown) {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, delivered: false, message: "The request body could not be read." },
      { status: 400 },
    );
  }

  // Honeypot: a real person never fills the hidden field.
  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Thanks — your message was received.",
    });
  }

  const name = cleanLine(payload.name);
  const email = cleanLine(payload.email);
  const subject = cleanLine(payload.subject);
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) errors.name = "Please enter a name between 2 and 80 characters.";
  if (!EMAIL_PATTERN.test(email) || email.length > 160) errors.email = "Please enter a valid email address.";
  if (subject.length < 3 || subject.length > 120) errors.subject = "Please add a subject between 3 and 120 characters.";
  if (message.length < 10) errors.message = "Please write a message of at least 10 characters.";
  if (message.length > 2000) errors.message = "Please keep the message under 2,000 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message: "Please check the highlighted fields and try again.",
        errors,
      },
      { status: 400 },
    );
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const identifier = forwarded.split(",")[0]?.trim() || "local";
  if (!checkRateLimit(identifier)) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message: "Too many messages in a short time. Please try again later.",
      },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  // The form is fully functional without credentials — it validates and reports
  // clearly that delivery is not configured rather than pretending to send.
  if (!apiKey || !to) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      message:
        "Message validated. Email delivery is not configured on this deployment, so nothing was sent.",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Portfolio enquiry — ${subject}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Contact provider responded with", response.status);
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          message:
            "The email provider rejected the message. Please try again, or reach out using the direct email link.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      delivered: true,
      message: "Message sent — thanks for reaching out. I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact delivery failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message: "Something went wrong while sending. Please use the direct email link instead.",
      },
      { status: 500 },
    );
  }
}
