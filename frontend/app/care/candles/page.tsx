import Link from "next/link";

const ITEMS = [
  "Our candles are made with 100% soy wax and essential oils, so they perform best with slower, steady burns.",
  "Trim the wick to about 1/4 inch before each burn to reduce soot and keep the flame even.",
  "On the first burn, allow the melt pool to reach close to the vessel edge before extinguishing to prevent tunneling.",
  "Aim for burn sessions of about 2-4 hours at a time, and let the wax fully cool before relighting.",
  "Keep candles on a heat-safe surface and away from fans, open windows, curtains, and anything flammable.",
  "Never leave a burning candle unattended, and discontinue use when about 1/2 inch of wax remains.",
] as const;

export default function CandlesCarePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(120,53,15,0.12)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9a3412]">
          Care guide
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#1f1714] sm:text-4xl">
          Candles
        </h1>
        <p className="mt-4 text-base leading-7 text-[#675148]">
          These steps are tailored for Hearts Garden candles made with 100% soy wax and essential oils.
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