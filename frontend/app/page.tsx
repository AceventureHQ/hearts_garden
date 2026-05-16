"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

type SignupState = "idle" | "submitting" | "success" | "error";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Front%20Street%20Farmers%27%20Market%20(Quinte%20West)&ll=44.1028612,-77.5766388&z=18&output=embed";

export default function Home() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SignupState>("idle");
  const [message, setMessage] = useState(
    "Get early launch updates and the first invite when Hearts Garden goes live.",
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

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          data?.message ?? "Unable to save your email right now.",
        );
      }

      setState("success");
      setEmail("");
      setMessage(
        data?.message ?? "You are on the list. We will keep you posted.",
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-6 sm:gap-8 lg:min-h-[calc(100vh-4rem)] lg:content-center lg:gap-10">
        <section className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-5 px-2 text-center sm:min-h-[24rem] sm:px-4 sm:gap-6">
            <Image
              src="/images/logo.png"
              width={350}
              height={350}
              alt="Hearts Garden logo"
              className="h-auto w-[clamp(12rem,48vw,21.875rem)]"
              priority
            />
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9a3412] sm:text-sm">
                Hearts Garden
              </p>
              {/* <p className="max-w-xl text-base leading-7 text-[#54413a] sm:text-lg sm:leading-8">
                Get early launch updates and the first invite when Hearts Garden
                goes live.
              </p> */}
              <div className="flex justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur sm:p-4"
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
                      className="inline-flex h-10 sm:h-14 items-center justify-center rounded-[1.3rem] bg-[#1f1714] px-6 text-base font-semibold text-[#fff8ef] transition hover:bg-[#35261f] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {state === "submitting" ? "Joining..." : "Join the list"}
                    </button>
                  </div>
                  <p
                    className={`mt-3 px-1 text-sm ${
                      state === "error"
                        ? "text-[#b42318]"
                        : state === "success"
                          ? "text-[#0f766e]"
                          : "text-[#675148]"
                    }`}
                    aria-live="polite"
                  >
                    {message}
                  </p>
                </form>
              </div>
            </div>
          </div>

          <section className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur">
            <div className="border-b border-[#ead9cc] px-5 py-4 sm:px-6 sm:py-5 lg:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9a3412] sm:text-sm">
                Find us
              </p>
              <p className="mt-2 text-sm text-[#54413a] sm:text-base">
                View our location on Google Maps.
              </p>
              <p className="mt-2 text-xs font-medium text-[#675148] sm:text-sm">
                We are there every Saturday from 8am-1pm when the market is
                open.
              </p>
            </div>
            <div className="min-h-[14rem] w-full flex-1 sm:min-h-[18rem] lg:min-h-[32rem]">
              <iframe
                title="Hearts Garden location on Google Maps"
                src={MAP_EMBED_URL}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </section>

        {/* <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur sm:p-4"
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
                className="inline-flex h-10 sm:h-14 items-center justify-center rounded-[1.3rem] bg-[#1f1714] px-6 text-base font-semibold text-[#fff8ef] transition hover:bg-[#35261f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === "submitting" ? "Joining..." : "Join the list"}
              </button>
            </div>
            <p
              className={`mt-3 px-1 text-sm ${
                state === "error"
                  ? "text-[#b42318]"
                  : state === "success"
                    ? "text-[#0f766e]"
                    : "text-[#675148]"
              }`}
              aria-live="polite"
            >
              {message}
            </p>
          </form>
        </div> */}

        {/* <div className="flex flex-wrap gap-3 text-sm text-[#675148]">
          <span className="rounded-full border border-[#ead9cc] bg-white/70 px-4 py-2">
            Lorem Ipsum
          </span>
        </div> */}
      </div>
    </main>
  );
}
