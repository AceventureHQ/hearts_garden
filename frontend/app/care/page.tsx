import Link from "next/link";

const CARE_PAGES = [
  {
    href: "/care/succulents",
    title: "Succulents",
    description: "Light, soil, and watering basics for low-maintenance plants.",
  },
  {
    href: "/care/candles",
    title: "Candles",
    description: "Detailed care for 100% soy wax candles made with essential oils.",
  },
  {
    href: "/care/jewelry",
    title: "Jewelry",
    description: "How to protect 18k gold plated and rhodium plated finishes.",
  },
] as const;

export default function CareIndexPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(120,53,15,0.12)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9a3412]">
          Care instructions
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#1f1714] sm:text-4xl">
          Choose a care guide.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#675148]">
          Each page gives you a short, practical set of instructions for the items featured in the dropdown.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {CARE_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-[1.5rem] border border-[#ead9cc] bg-[#fffaf5] p-5 transition hover:-translate-y-0.5 hover:border-[#c89a74] hover:bg-white"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9a3412]">
                {page.title}
              </p>
              <p className="mt-3 text-base leading-7 text-[#675148]">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}