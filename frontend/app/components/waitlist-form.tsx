"use client";

import { FormEvent, useState } from "react";

type SubmissionState = "idle" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("Join the waitlist for launch updates.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setState("error");
      setMessage("Enter a valid email address to join the waitlist.");
      return;
    }

    setState("success");
    setMessage("You're on the list. We'll send launch news when it's ready.");
    setEmail("");
  }

  const messageTone = state === "error" ? "text-rose-200" : state === "success" ? "text-emerald-200" : "text-white/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/8 p-4 shadow-lg shadow-black/20"
    >
      <label className="block text-sm font-medium text-white/80" htmlFor="waitlist-email">
        Early access waitlist
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-12 flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-white/25"
        />
        <button
          type="submit"
          className="h-12 rounded-2xl bg-white px-5 font-medium text-slate-950 transition hover:bg-white/90"
        >
          Notify me
        </button>
      </div>
      <p aria-live="polite" className={`text-sm leading-6 ${messageTone}`}>
        {message}
      </p>
    </form>
  );
}