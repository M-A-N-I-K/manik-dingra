import { NextResponse } from "next/server";
import { Resend } from "resend";

const LIMIT = 3;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_TRACKED_IPS = 5000;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory, so it is per server instance and resets on cold start.
// Good enough to stop casual spam on a portfolio; use a shared store (e.g. Upstash) for strict limits.
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (ipMap.size >= MAX_TRACKED_IPS) {
    for (const [key, entry] of ipMap) {
      if (now > entry.resetAt) ipMap.delete(key);
    }
  }

  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= LIMIT) return true;

  entry.count++;
  return false;
}

function getClientIp(request: Request): string {
  // x-real-ip is set by the hosting proxy (Vercel); x-forwarded-for's first entry is client-controlled
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ??
    "unknown"
  );
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  const cleanName = name.trim().replace(/[\r\n]+/g, " ");
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (
    cleanName.length > MAX_NAME ||
    cleanEmail.length > MAX_EMAIL ||
    cleanMessage.length > MAX_MESSAGE
  ) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again later." },
      { status: 500 },
    );
  }

  // Created per request so builds don't require the key at module load
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: "manikdhingra0582@gmail.com",
    replyTo: cleanEmail,
    subject: `New message from ${cleanName}`,
    text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
  });

  if (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
