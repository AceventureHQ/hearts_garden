type ResendContactResponse = {
  id?: string;
  message?: string;
};

type ResendSegment = {
  id: string;
  name?: string;
};

type ResendListResponse<T> = {
  data?: T[];
  message?: string;
};

const WAITLIST_SEGMENT_NAME = "signup list";

async function getOrCreateWaitlistSegmentId(apiKey: string) {
  const listResponse = await fetch("https://api.resend.com/segments", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const listPayload = (await listResponse.json().catch(() => null)) as ResendListResponse<ResendSegment> | null;

  if (listResponse.ok) {
    const existingSegment = listPayload?.data?.find(
      (segment) => segment.name?.toLowerCase() === WAITLIST_SEGMENT_NAME
    );

    if (existingSegment) {
      return existingSegment.id;
    }
  }

  const createResponse = await fetch("https://api.resend.com/segments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: WAITLIST_SEGMENT_NAME,
    }),
  });

  const createPayload = (await createResponse.json().catch(() => null)) as ResendSegment | null;

  if (!createResponse.ok || !createPayload?.id) {
    const message =
      (createPayload as ResendListResponse<ResendSegment> | null)?.message ??
      "Unable to create the waitlist segment right now.";
    throw new Error(message);
  }

  return createPayload.id;
}

export async function addWaitlistContact(email: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  const segmentId = await getOrCreateWaitlistSegmentId(apiKey);

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    }),
  });

  const payload = (await response.json().catch(() => null)) as ResendContactResponse | null;

  if (!response.ok) {
    const message = payload?.message ?? "Unable to save your email right now.";

    if (/already|exists|duplicate/i.test(message)) {
      return { alreadyExists: true };
    }

    throw new Error(message);
  }

  return { alreadyExists: false, contactId: payload?.id ?? null };
}