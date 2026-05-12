"use client";

import { FormEvent, useState } from "react";

type SignupState = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SignupState>("idle");
  const [message, setMessage] = useState(
    "Get early launch updates and the first invite when Hearts Garden goes live."
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setState("error");
      setMessage("Enter your email address to join the waitlist.");
      return;
    }

    setState("submitting");
    setMessage("Adding you to the list...");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to save your email right now.");
      }

      setState("success");
      setEmail("");
      setMessage(data?.message ?? "You are on the list. We will keep you posted.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-72 w-72 rounded-full bg-[#f59e0b]/15 blur-3xl" />
        <div className="absolute right-[-10rem] top-24 h-80 w-80 rounded-full bg-[#9a3412]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#fbbf24]/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="flex flex-col justify-center gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#7c2d12]/15 bg-white/70 px-4 py-2 text-sm font-medium text-[#7c2d12] shadow-[0_10px_30px_rgba(120,53,15,0.08)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Launch waitlist open
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9a3412]">
                Hearts Garden
              </p>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-[#1f1714] sm:text-6xl lg:text-7xl">
                A softer way to announce what comes next.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[#54413a] sm:text-xl">
                This base site captures early signups with Resend, so you can build an audience before the full experience is ready.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="waitlist-email">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="h-14 flex-1 rounded-[1.3rem] border border-[#e7d7c9] bg-[#fffaf5] px-5 text-base text-[#1f1714] outline-none transition focus:border-[#c56a2d] focus:ring-4 focus:ring-[#c56a2d]/10"
                />
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="inline-flex h-14 items-center justify-center rounded-[1.3rem] bg-[#1f1714] px-6 text-base font-semibold text-[#fff8ef] transition hover:bg-[#35261f] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state === "submitting" ? "Joining..." : "Join the list"}
                </button>
              </div>
              <p
                className={`mt-3 px-1 text-sm ${
                  state === "error" ? "text-[#b42318]" : state === "success" ? "text-[#0f766e]" : "text-[#675148]"
                }`}
                aria-live="polite"
              >
                {message}
              </p>
            </form>

            <div className="flex flex-wrap gap-3 text-sm text-[#675148]">
              <span className="rounded-full border border-[#ead9cc] bg-white/70 px-4 py-2">Launch updates</span>
              <span className="rounded-full border border-[#ead9cc] bg-white/70 px-4 py-2">Early access</span>
              <span className="rounded-full border border-[#ead9cc] bg-white/70 px-4 py-2">No spam</span>
            </div>
          </div>

          <div className="grid gap-4 self-center rounded-[2rem] border border-white/70 bg-[#fff8f0]/90 p-4 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur sm:p-6">
            <div className="rounded-[1.6rem] border border-[#eddccf] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9a3412]">Built for later</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#1f1714]">A clean starting point for the finished site.</h2>
              <p className="mt-3 text-base leading-7 text-[#5e4a42]">
                Swap the placeholder copy, add product details, and keep the waitlist form running as the project grows.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[1.4rem] border border-[#eddccf] bg-white p-5">
                <p className="text-sm font-medium text-[#9a3412]">1. Capture interest</p>
                <p className="mt-3 text-sm leading-6 text-[#5e4a42]">
                  Collect emails now so you have a real audience on day one.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-[#eddccf] bg-white p-5">
                <p className="text-sm font-medium text-[#9a3412]">2. Store in Resend</p>
                <p className="mt-3 text-sm leading-6 text-[#5e4a42]">
                  Each signup is sent to your Resend contacts list through a server route.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
