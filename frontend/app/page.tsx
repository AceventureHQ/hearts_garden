"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

type SignupState = "idle" | "submitting" | "success" | "error";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Front%20Street%20Farmers%27%20Market%20(Quinte%20West)&ll=44.1028612,-77.5766388&z=18&output=embed";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/heartsgardentrenton",
    label: "@heartsgardentrenton",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-6 w-6 shrink-0"
        aria-hidden
      >
        <path
          fill="#1877F2"
          d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
        />
        <path
          fill="#FFF"
          d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
        />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/heartsgardentrenton",
    label: "@heartsgardentrenton",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-6 w-6 shrink-0"
        aria-hidden 
      >
        <g fill="none">
          <rect
            width="256"
            height="256"
            fill="url(#findUsInstagram0)"
            rx="60"
          />
          <rect
            width="256"
            height="256"
            fill="url(#findUsInstagram1)"
            rx="60"
          />
          <path
            fill="#fff"
            d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604h.031Zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563v.025Zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355h.002Zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334Z"
          />
          <defs>
            <radialGradient
              id="findUsInstagram0"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FD5" />
              <stop offset=".1" stopColor="#FD5" />
              <stop offset=".5" stopColor="#FF543E" />
              <stop offset="1" stopColor="#C837AB" />
            </radialGradient>
            <radialGradient
              id="findUsInstagram1"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3771C8" />
              <stop offset=".128" stopColor="#3771C8" />
              <stop offset="1" stopColor="#60F" stopOpacity="0" />
            </radialGradient>
          </defs>
        </g>
      </svg>
    ),
  },
  {
    href: "mailto:contact@heartsgarden.ca",
    label: "contact@heartsgarden.ca",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 text-[#54413a]"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm3.519 0L12 11.671L18.481 6H5.52zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16V7.329z"
        />
      </svg>
    ),
  },
] as const;

type SocialLinkItem = (typeof SOCIAL_LINKS)[number];

const SOCIAL_MEDIA_LINKS = SOCIAL_LINKS.filter(
  (link) => !link.href.startsWith("mailto:"),
);
const EMAIL_LINK = SOCIAL_LINKS.find((link) =>
  link.href.startsWith("mailto:"),
)!;

function SocialLink({ href, label, icon }: SocialLinkItem) {
  const isEmail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="inline-flex items-center gap-2.5 text-sm font-medium text-[#54413a] transition hover:text-[#9a3412] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c56a2d] sm:text-base"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SignupState>("idle");
  const [message, setMessage] = useState(
    "Be the first to know Hearts Garden updates!",
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
          <div className="flex h-full min-h-72 flex-col items-center justify-center gap-5 px-2 text-center sm:min-h-96 sm:px-4 sm:gap-6">
            <Image
              src="/images/logo.png"
              width={350}
              height={350}
              alt="Hearts Garden logo"
              className="h-auto w-[clamp(12rem,48vw,21.875rem)]"
              priority
            />
            <div className="space-y-4">
              <div className="flex justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur sm:p-4"
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
                      className="h-14 flex-1 rounded-[1.3rem] border border-[#e7d7c9] bg-[#fffaf5] p-3 text-base text-[#1f1714] outline-none transition focus:border-[#c56a2d] focus:ring-4 focus:ring-[#c56a2d]/10"
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
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                  {SOCIAL_MEDIA_LINKS.map((link) => (
                    <SocialLink key={link.href} {...link} />
                  ))}
                </div>
                <SocialLink {...EMAIL_LINK} />
              </div>
            </div>
          </div>

          <section className="flex h-full flex-col overflow-hidden rounded-4xl border border-white/70 bg-white/75 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur">
            <div className="border-b border-[#ead9cc] px-5 py-4 text-center sm:px-6 sm:py-5 lg:px-8">
              <p className="text-base font-bold uppercase tracking-[0.35em] text-[#9a3412] sm:text-lg">
                Visit the Market!
              </p>
              <p className="mt-2 text-xs font-medium text-[#675148] sm:text-sm">
                Every Saturday from 8am-1pm.
              </p>
            </div>
            <div className="min-h-56 w-full flex-1 sm:min-h-72 lg:min-h-128">
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
      </div>
    </main>
  );
}
