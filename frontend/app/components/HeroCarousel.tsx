"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CAROUSEL_ITEMS = [
  // {
  //   src: "/images/market_stand.JPG",
  //   eyebrow: "Seasonal pieces",
  //   title: "Farmer market stand",
  //   description:
  //     "Lorem ipsum",
  // },
  {
    src: "/images/bracelet_display.JPG",
    eyebrow: "Fresh arrivals",
    title: "18k plated bracelets on display",
    description:
      "Lorem ipsum",
  },
  {
    src: "/images/keychain_display.JPG",
    eyebrow: "Thoughtful design",
    title: "Keychain display",
    description:
      "Lorem ipsum",
  },
  {
    src: "/images/succulent_display.JPG",
    eyebrow: "Gift-ready moments",
    title: "Succulent display",
    description:
      "Lorem ipsum",
  },
  {
    src: "/images/flower_candle.JPG",
    eyebrow: "Small treasures",
    title: "Flower candle",
    description:
      "Lorem ipsum",
  },
  {
    src: "/images/farmer_market.JPG",
    eyebrow: "Small treasures",
    title: "Farmer market sign",
    description:
      "Lorem ipsum",
  },
] as const;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % CAROUSEL_ITEMS.length);
    }, 5500);

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    }

    window.addEventListener("keydown", onKey);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? CAROUSEL_ITEMS.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % CAROUSEL_ITEMS.length);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/75 bg-white/70 shadow-[0_30px_90px_rgba(120,53,15,0.16)] backdrop-blur-xl">
        <div className="relative h-[min(72vh,44rem)] min-h-[30rem]">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              touchDeltaX.current = 0;
            }}
            onTouchMove={(e) => {
              if (touchStartX.current === null) return;
              const currentX = e.touches[0].clientX;
              touchDeltaX.current = currentX - touchStartX.current;
            }}
            onTouchEnd={() => {
              const delta = touchDeltaX.current;
              const threshold = 50; // px
              if (delta > threshold) {
                goToPrevious();
              } else if (delta < -threshold) {
                goToNext();
              }
              touchStartX.current = null;
              touchDeltaX.current = 0;
            }}
          >
            {CAROUSEL_ITEMS.map((item) => (
              <article
                key={item.src}
                className="relative h-full w-full shrink-0"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority={item.src === CAROUSEL_ITEMS[0].src}
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className="object-cover"
                />
                {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,10,0.08)_0%,rgba(17,12,10,0.22)_42%,rgba(17,12,10,0.65)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
                  <div className="max-w-2xl rounded-[1.75rem] border border-white/25 bg-black/35 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-6 lg:p-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[#f6d6bd] sm:text-xs">
                      {item.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-4xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/82 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div> */}
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/25 p-3 text-white backdrop-blur-md transition hover:bg-black/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                d="M12.5 4.75L7.5 10L12.5 15.25"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/25 p-3 text-white backdrop-blur-md transition hover:bg-black/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                d="M7.5 4.75L12.5 10L7.5 15.25"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/25 bg-black/22 px-3 py-2 backdrop-blur-md">
            {CAROUSEL_ITEMS.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/75"}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
