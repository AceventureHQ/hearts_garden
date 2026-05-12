import { addWaitlistContact } from "@/lib/resend-waitlist";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Send a JSON body with an email address." }, { status: 400 });
  }

  const email = typeof payload === "object" && payload !== null && "email" in payload
    ? String((payload as { email: unknown }).email).trim().toLowerCase()
    : "";

  if (!email || !isValidEmail(email)) {
    return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const result = await addWaitlistContact(email);

    return Response.json(
      {
        message: result.alreadyExists
          ? "That email is already on the list."
          : "You are on the waitlist. Thanks for signing up.",
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save your email right now.";
    return Response.json({ message }, { status: 500 });
  }
}