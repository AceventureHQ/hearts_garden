import Link from "next/link";

const ITEMS = [
  "Our jewelry pieces are 18k gold plated or rhodium plated, so gentle handling helps the finish last longer.",
  "Put jewelry on last after perfume, lotions, sunscreen, and hair products have dried.",
  "Remove pieces before showering, swimming, workouts, and sleeping to reduce wear on the plating.",
  "After wearing, wipe each piece with a soft dry cloth to remove skin oils and moisture.",
  "Store items separately in a pouch or lined box to prevent scratches and friction between pieces.",
  "Avoid abrasive cleaners and polishing dips; use only a soft cloth and mild care to preserve the plated layer.",
] as const;

export default function JewelryCarePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(120,53,15,0.12)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9a3412]">
          Care guide
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#1f1714] sm:text-4xl">
          Jewelry
        </h1>
        <p className="mt-4 text-base leading-7 text-[#675148]">
          These care tips are designed for plated jewelry so your 18k gold plated and rhodium plated pieces stay beautiful.
        </p>

        <div className="mt-8 space-y-4">
          {ITEMS.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-[#ead9cc] bg-[#fffaf5] p-5">
              <p className="text-base leading-7 text-[#1f1714]">{item}</p>
            </div>
          ))}
        </div>

        <Link
          href="/care"
          className="mt-8 inline-flex h-11 items-center rounded-full border border-[#dbc6b6] bg-white px-4 text-sm font-semibold text-[#1f1714] transition hover:border-[#c89a74] hover:bg-[#fffaf5]"
        >
          Back to care instructions
        </Link>
      </section>
    </main>
  );
}