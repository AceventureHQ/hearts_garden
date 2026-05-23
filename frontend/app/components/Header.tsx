"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CARE_TOPICS = [
  {
    title: "Succulents",
    href: "/care/succulents",
    description:
      "Bright light, sparse watering, and a simple routine that keeps them happy.",
  },
  {
    title: "Candles",
    href: "/care/candles",
    description:
      "100% soy wax and essential oil candle care for a cleaner, longer burn.",
  },
  {
    title: "Jewelry",
    href: "/care/jewelry",
    description:
      "Care tips for 18k gold plated and rhodium plated jewelry pieces.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const closeTimer = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 160);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function updateHoverCapability() {
      setCanHover(mediaQuery.matches);
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-care-menu]")) {
        return;
      }

      setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    updateHoverCapability();
    mediaQuery.addEventListener("change", updateHoverCapability);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", updateHoverCapability);
      clearCloseTimer();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/65 bg-[#f6efe7]/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="justify-self-start">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full border border-[#dbc6b6] bg-white/70 px-4 text-sm font-semibold text-[#1f1714] shadow-sm transition hover:border-[#c89a74] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c56a2d]"
          >
            Home
          </Link>
        </div>

        <Link
          href="/"
          className="justify-self-center rounded-full p-1 transition hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c56a2d]"
          aria-label="Hearts Garden home"
        >
          <Image
            src="/images/logo.png"
            width={84}
            height={84}
            alt="Hearts Garden logo"
            className="h-12 w-12 rounded-full object-cover shadow-[0_10px_30px_rgba(120,53,15,0.16)] sm:h-16 sm:w-16"
            priority
          />
        </Link>

        <div className="relative justify-self-end" data-care-menu>
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => {
              if (!canHover) {
                setOpen((value) => !value);
              }
            }}
            onMouseEnter={() => {
              if (canHover) {
                clearCloseTimer();
                setOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (canHover) {
                scheduleClose();
              }
            }}
            onFocus={() => setOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                scheduleClose();
              }
            }}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#dbc6b6] bg-white/70 px-4 text-sm font-semibold text-[#1f1714] shadow-sm transition hover:border-[#c89a74] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c56a2d]"
          >
            Care Instructions
            <ChevronIcon open={open} />
          </button>

          <div
            onMouseEnter={() => {
              if (canHover) {
                clearCloseTimer();
                setOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (canHover) {
                scheduleClose();
              }
            }}
            className={`absolute right-0 top-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-2rem))] origin-top-right transition-all duration-300 ease-out ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/95 p-4 shadow-[0_24px_70px_rgba(120,53,15,0.18)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a3412]">
                Care notes
              </p>
              <div className="mt-4 space-y-3">
                {CARE_TOPICS.map((topic) => (
                  <Link
                    href={topic.href}
                    key={topic.title}
                    onClick={() => setOpen(false)}
                    className="block rounded-[1.25rem] border border-[#ead9cc] bg-[#fffaf5] px-4 py-3 transition hover:border-[#c89a74] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c56a2d]"
                  >
                    <p className="text-sm font-semibold text-[#1f1714]">
                      {topic.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#675148]">
                      {topic.description}
                    </p>
                  </Link>
                ))}
                <Link
                  href="/care"
                  onClick={() => setOpen(false)}
                  className="block rounded-[1.25rem] border border-[#dbc6b6] bg-white px-4 py-3 text-center text-sm font-semibold text-[#1f1714] transition hover:border-[#c89a74] hover:bg-[#fffaf5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c56a2d]"
                >
                  View all care instructions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
