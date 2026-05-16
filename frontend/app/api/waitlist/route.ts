import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    const maybeMessage = error.message;

    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }
  }

  return "Unknown error";
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendAudienceId = process.env.RESEND_AUDIENCE_ID;

  if (!resendApiKey || !resendAudienceId) {
    return NextResponse.json(
      { error: "Server is missing RESEND_API_KEY or RESEND_AUDIENCE_ID." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rawEmail =
    body && typeof body === "object" && "email" in body ? body.email : "";
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.contacts.create({
    email,
    audienceId: resendAudienceId,
    unsubscribed: false,
  });

  if (error) {
    const errorMessage = getErrorMessage(error).toLowerCase();

    if (errorMessage.includes("already") && errorMessage.includes("exist")) {
      return NextResponse.json({
        message: "This email is already on the waitlist.",
      });
    }

    return NextResponse.json(
      { error: "Could not save your email right now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "You're on the list. We'll share launch updates soon.",
  });
}
